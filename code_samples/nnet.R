# nnet - Function to training a neural network w/ Forward+Back Propagation
# x := a data.frame-compatible of numeric features
# output := desired outputs. Note: determines number of output neurons
# neurons := list of the number neurons per hidden layer to use. Do not include output and input neurons.
# alpha := learning rate for the stochastic gradient descent propagation
# sigma := character type representing which activation function to use.
# w := list of initial weights, where each element in the list is a matrix, and each column in the matrix
# represents the initial edge weights. Expects bias weight as the first row. If not supplied, [uniformly]
# random weights are generated between (0, 1).
# Author: Matt Piekenbrock

nnet <- function(x, dataset, neurons = 1, alpha=0.5, sigma = c("logistic"), w=NA, steps=1000,
                 debug=T, threshold=0.01, lambda=0) {
  dataset <- as.data.table(dataset)
  if ("formula" %in% class(x)) {
    RVs <- attr(terms.formula(x), "variable")
    input_data <- as.matrix(dataset[, eval(RVs[-2])])
    lhs <- parse(text=paste0("list(", paste0(all.vars(RVs[1:2]), collapse=","), ")"))
    output_data <- as.matrix(dataset[, eval(lhs)])
  } else { stop("Requires Formula") }

  # Get number of neurons in each layer
  neurons <- append(neurons, ncol(output_data)) # nlevels(as.factor(output_data)) add output nodes as 'neurons'

  # Generate random weights if not given
  if (missing(w)) {
    w <- mapply(function(n_i, i) {
      if (i == 1) matrix(runif(n_i*(ncol(input_data)+1)), ncol=n_i, nrow=ncol(input_data)+1)
      else matrix(runif(n_i*(neurons[[i-1]]+1)), ncol=n_i, nrow=neurons[[i-1]]+1) },
      neurons, 1:length(neurons))
  } else if (length(w) == 1) {
    w <- mapply(function(n_i, i) {
      if (i == 1) {
        matrix(rep(w, n_i*(ncol(input_data)+1)), ncol=n_i, nrow=ncol(input_data)+1)
      } else { matrix(rep(w, n_i*(neurons[[i-1]]+1)), ncol=n_i, nrow=neurons[[i-1]]+1) }
    }, neurons, 1:length(neurons), SIMPLIFY = F)
  }
  # Activation function
  sigma <- function(x) 1 / (1 + exp(x = -x))

  { i <- 1; weight_iters <- list(); total_error <- Inf; weight_thresh <- list(Inf); w_change <- Inf }
  while (i < steps) {
    { perror_pout <- pout_pnet <- pnet_pweight <- list() }
    pw <- replicate(nrow(input_data), list()) # whoa check this

    for (r_i in 1:nrow(input_data)) {
      tout <- output_data[r_i,]

      ## --- Forward Propagation ---
      { layer_net <- list(); layer_out <- list() }
      for (layer in 1:length(neurons)) {
        # Initial and supplemental application of weights
        layer_net[[layer]] <- sapply(1:neurons[[layer]], function(n_i) {
          w[[layer]][, n_i] %*% if (layer == 1) c(1, unlist(input_data[r_i,])) else c(1, layer_out[[layer-1]])
        })
        # Put inputs into activation function
        layer_out[[layer]] <- sigma(layer_net[[layer]])
      } ## --- End Forward Propagation ---

      ## --- Backward Propagation ---
      nout <- neurons[[length(neurons)]]
      total_error <- 0
      for (layer in length(neurons):1) {
        # Partials
        perror_pout[[layer]] <- if (layer == length(neurons)) -(tout - layer_out[[layer]]) else as.matrix(w[[layer+1]][-1,]) %*% matrix(unlist(perror_pout[[layer+1]] * pout_pnet[[layer+1]]), nrow=ncol(w[[layer+1]])) # per node
        pout_pnet[[layer]] <- layer_out[[layer]] * (1 -  layer_out[[layer]])
        pnet_pweight[[layer]] <- if(layer == 1) input_data[r_i,] else layer_out[[layer-1]] # double-check

        # As vectors
        perror_pout[[layer]] <- as.vector(perror_pout[[layer]])
        pout_pnet[[layer]] <- as.vector(pout_pnet[[layer]])
        pnet_pweight[[layer]] <- as.vector(pnet_pweight[[layer]])

        # Number of neurons
        n_i <- if (layer == 1) length(input_data[r_i,]) else neurons[[layer-1]]

        # Propagate rates of error changes through each neurons set of edge weights
        p1 <- matrix(perror_pout[[layer]], nrow=n_i, ncol=length(perror_pout[[layer]]), byrow = T)
        p2 <- matrix(pout_pnet[[layer]], nrow=n_i, ncol=length(pout_pnet[[layer]]), byrow = T)
        p3 <- matrix(pnet_pweight[[layer]], nrow=neurons[[layer]], ncol=length(pnet_pweight[[layer]]), byrow = T)

        # Double-check dimensions
        # if (all(dim(p3) == dim(p1))) p3 <- t(p3)

        # Save partials each iteration, for each record
        pw[[r_i]][[layer]] <- rbind(perror_pout[[layer]] * pout_pnet[[layer]], (p1 * p2 * t(p3)))
      }
    } # for record

    # Average the theta matrices for the current step of training, and compute error residuals
    for (layer in 1:length(neurons)){
      layer_partials <- lapply(pw, function(m) m[[layer]])
      layer_avg <- Reduce("+", layer_partials) # / length(layer_partials)
      w[[layer]] <- w[[layer]] - (alpha * layer_avg) - (lambda * alpha * w[[layer]])
    }
    if (max(abs(unlist(w))) < threshold)
      break;
    i <- i + 1
    if (i %% 100 == 0 && debug) { cat("Iter: ", i, "\n") }
  } #   for (i in ...)
  error <-  sum((1/2)*(tout - layer_out[[length(neurons)]])^2)
  model <- structure(list(data = input_data, weights = w, rate=alpha, neurons=neurons,
                          act.fct = sigma, steps = i, threshold_reached = max(abs(unlist(w))),
                          error=error, output = unique(output_data)),
                     class="nnet", output_neurons = lhs, input_neurons=RVs[-2])
  return(model)
}

# takes as an input 'net' (a nnet object) and input (a data frame containing only input variables)
predict_nnet <- function(net, input, simplified=T) {
  ## --- Forward Propagation ---
  { layer_net <- replicate(nrow(input), list()); layer_out <- replicate(nrow(input), list()); w <- net$weights }
  for (row_i in 1:nrow(input)){

    for (layer in 1:length(net$neurons)) {
      # Initial and supplemental application of weights
      layer_net[[row_i]][[layer]] <- sapply(1:net$neurons[[layer]], function(n_i) {
        w[[layer]][, n_i] %*% if (layer == 1) c(1, unlist(input[row_i,])) else c(1, layer_out[[row_i]][[layer-1]])
      })
      # Put inputs into activation function
      layer_out[[row_i]][[layer]] <- net$act.fct(layer_net[[row_i]][[layer]])
    }

  } # End row

  out <- as.matrix(data.table::rbindlist(lapply(layer_out, function(m) as.list(m[[layer]]))), dimnames = NULL)
  if (simplified){
    res <- sapply(1:nrow(out), function(i) which(out[i,] == max(out[i,])))
    return(unname(res))
  } else { return(out) }
}

# Expects the neural network model (net) and a testing data set with both input and output features
summary_nnet <- function(net, test_set, confusion_matrix=F) {
  test_set <- data.table::data.table(test_set)
  test_truth <- test_set[, eval(attr(net, "output_neurons"))]
  test_truth <- as.matrix(sapply(1:nrow(test_truth), function(i) test_truth[i, which(.SD == max(.SD))]))
  test_preds <- predict_nnet(net, test_set[, eval(attr(net, "input_neurons"))])
  test_preds <- sapply(test_preds, max)
  results <- data.table::data.table(truth=as.numeric(unlist(test_truth)), pred=as.numeric(unlist(test_preds)))
  results <- cbind(as.numeric(unlist(test_truth)), as.numeric(unlist(test_preds)))
  cm <- matrix(0, nrow=ncol(net$output), ncol=ncol(net$output))
  for (pred in 1:ncol(net$output)){
    for (actual in 1:ncol(net$output)){
      cm[pred, actual] <- length(which(results[test_truth == actual, 2] == pred))
    }
  }
  dimnames(cm) <- list(paste0("P", colnames(net$output)), paste0("A", colnames(net$output)))
  Prec <- sapply(1:nrow(cm), function(p_class) cm[p_class, p_class] / sum(cm[, p_class]))
  Recall <- sapply(1:nrow(cm), function(p_class) cm[p_class, p_class] / sum(cm[p_class,]))
  F1 <- 2 * ((Prec * Recall)/(Prec + Recall))
  if (confusion_matrix)
    return(cm)
  else
    return(str(list(Precision=Prec, Recall=Recall, F1=F1)))
}
