---
title: "My RMD Post"
author: "Matt Piekenbrock"
date: 2017-02-01
categories: ["R"]
tags: ["R Markdown", "plot", "regression"]
slug: my-rmd-post
include_toc: true
output: 
  html_document:
    keep_md: TRUE
    self_contained: TRUE
    highlight: kate
---



# Testing LaTeX

What?
Trying out latex:

![image-20200105114457697](/Users/mpiekenbrock/Library/Application Support/typora-user-images/image-20200105114457697.png)

$$\{x : f(x) \geq \lambda \}$$

# R Markdown

You can embed an R code chunk like this:


```r
summary(cars)
##      speed           dist       
##  Min.   : 4.0   Min.   :  2.00  
##  1st Qu.:12.0   1st Qu.: 26.00  
##  Median :15.0   Median : 36.00  
##  Mean   :15.4   Mean   : 42.98  
##  3rd Qu.:19.0   3rd Qu.: 56.00  
##  Max.   :25.0   Max.   :120.00
fit <- lm(dist ~ speed, data = cars)
fit
## 
## Call:
## lm(formula = dist ~ speed, data = cars)
## 
## Coefficients:
## (Intercept)        speed  
##     -17.579        3.932
```

# Including Plots

You can also embed plots. See Figure \@ref(fig:pie) for example:


```r
par(mar = c(0, 1, 0, 1))
pie(
  c(280, 60, 20),
  c('Sky', 'Sunny side of pyramid', 'Shady side of pyramid'),
  col = c('#0292D8', '#F7EA39', '#C4B632'),
  init.angle = -50, border = NA
)
```

![A fancy pie chart.](my_rmd_post_files/figure-html/pie-1.png)
