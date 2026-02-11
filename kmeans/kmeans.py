import numpy as np 
from scipy.spatial import voronoi_plot_2d, Voronoi
from scipy.spatial.distance import cdist 

# X = np.random.uniform(size=(150,2))
from scipy.io import loadmat
mnist = loadmat("/Users/mpiekenbrock/DS5230/mnist-original.mat")
X, y = mnist['data'].T, np.ravel(mnist['label'])

X = 5*np.random.uniform(size=(1500,2))

def lloyds(X: np.ndarray, k: int, tol: float = 1e-2) -> tuple:
  km = np.random.uniform(X.min(axis=0), X.max(axis=0), (k, X.shape[1]))
  km_resi, km_dist = np.full(len(X), np.inf), cdist(X, km)
  while np.mean(np.abs(km_resi)) > tol:
    km_part, km_obj = km_dist.argmin(axis=1), km_dist.min(axis=1)
    km = np.array([X[km_part == ki].mean(axis=0) for ki in range(k)])
    km_dist = cdist(X, km) 
    km_resi = km_obj - km_dist.min(axis=1)
    print(f"k-means objective: {np.log(np.sum(km_obj)):.5f}, Mean residual: {np.mean(np.abs(km_resi))}") 
  return km, km_obj

lloyds(X, 2)
lloyds(X, 5)
lloyds(X[:5000], 5)




# def lloyds(X: np.ndarray, k: int):
#   km = np.random.uniform(X.min(axis=0), X.max(axis=0), (k, X.shape[1]))
#   # k_means_dis = cdist(X, k_means)
#   # k_means_obj = k_means_dis.min(axis=1)
#   # k_means_obj = k_means_dis.min(axis=1)
#   km_resi = np.repeat(np.inf, len(X))
#   while np.mean(np.abs(km_resi)) > 0.1:
#     km_dist = cdist(X, km) 
#     km_part, km_obj = km_dist.argmin(axis=1), km_dist.min(axis=1)
#     km = np.array([X[km_part == ki].mean(axis=0) for ki in range(k)])
#     # k_means_dis = cdist(X, k_means)
#     km_res = km_obj - km_dist.min(axis=1)
#     km_obj -= km_res
#     print(f"k-means objective: {np.log(np.sum(km_obj)):.5f}") 
#     # Residual: {np.mean(np.abs(k_means_res))}")
#   return km, km_obj


# %% 
# np.array([y[k_assign == ki] for ki in range(k)])
from collections import Counter
for j in range(k):
  cluster_j = y[k_assign == j]
  cluster_cc = Counter(cluster_j)
  cluster_cls = int(cluster_cc.most_common(1)[0][0])
  cluster_purity = np.sum(cluster_j == cluster_cls) / len(cluster_j)
  print(f"Cluster {j} purity: {cluster_purity}")


from scipy.cluster.vq import kmeans2
from scipy.cluster.vq import vq, whiten
X_norm = whiten(X).astype(np.float32)

for s in range(5):
  centroid, label = kmeans2(X_norm, k = 10, iter=60, minit='++', seed = s * 128)
  purities = []
  for j in range(k):
    cluster_j = y[label == j]
    cluster_cc = Counter(cluster_j)
    cluster_cls = int(cluster_cc.most_common(1)[0][0])
    cluster_purity = np.sum(cluster_j == cluster_cls) / len(cluster_j)
    # print(f"Cluster {j} purity: {cluster_purity}")
    purities.append(cluster_purity)
  print(f"{s}: {np.mean(purities):.3f}")

## best run was 0.64, though typical is more about 0.55 

# %% 
V = Voronoi(k_means)
voronoi_plot_2d(V)