# %% 
import numpy as np 
from scipy.linalg import eigh_tridiagonal
from scipy.sparse.linalg import eigsh
from scipy.sparse import spdiags, diags
from primate.diagonalize import lanczos
import bokeh 
from bokeh.plotting import figure, show
from bokeh.io import output_notebook
from bokeh.layouts import row, column
from bokeh.models.annotations.labels import Label
output_notebook()

np.random.seed(1234)
true_ew = np.append(np.linspace(0, 2, num=201, endpoint=True), [2.5,3.0])
v0 = np.random.normal(loc=0.0, scale=1.0, size=len(true_ew))
v0 /= np.linalg.norm(v0)

all_ew = []
scatter_x, scatter_y = [],[]
for s in range(1, 20):
  alpha, beta = lanczos(diags(true_ew), v0=v0, max_steps=s, orth=0)
  ew = np.sort(eigh_tridiagonal(alpha, beta[:-1], eigvals_only=True))
  all_ew.append(ew[-s:])
  scatter_x.extend(np.repeat(s, s))
  scatter_y.extend(ew[-s:])
  # p.scatter(np.repeat(s, s), )
# show(p)

from more_itertools import collapse, pairwise
ew_arr = np.array(list(collapse(all_ew)))
end_ind = np.cumsum(range(1, 20))
beg_ind = np.append(0, end_ind)[:-1]
lines_x, lines_y = [], []
for i, ((b1,e1),(b2,e2)) in enumerate(pairwise(zip(beg_ind, end_ind))):
  l, r = ew_arr[b1:e1], ew_arr[b2:e2]
  # matching = min_weight_matching(l,r) # nah doesn't work 
  piv = len(r) // 2
  for x1,x2 in zip(l, np.delete(r, piv)):
    lines_x.append([i+1,i+2])
    lines_y.append([x1,x2])

# %% Make animation 
from bokeh.models import Range1d, Span, LinearAxis
from bokeh.io import export_png, export_svg
anim_dir = "/Users/mpiekenbrock/peekxc.github.io/content/posts/lanczos/krylov_animation/"

# ritz_axis = LinearAxis(
#   axis_label="Rayleigh-Ritz values",
# )
eigen_axis = LinearAxis(
  axis_label="Eigen-values"
)

for frame_id in range(0, 20):
  p = figure(width=375, height=300, title = "Lanczos's \"method of minimized iterations\"",  y_axis_location="left")
  it_line = Span(location=frame_id, dimension='height', line_color='red', line_width=2)
  p.add_layout(it_line)
  p.output_backend = "svg"
  p.multi_line(lines_x, lines_y, color='black')
  p.scatter(scatter_x, scatter_y, size=6, color=np.where(np.array(scatter_x) < frame_id, "red", "#a9a9a9a9"), legend_label="ritz-value")
  spaced_ew = np.append(true_ew[0:-2:7], true_ew[-2:])
  p.scatter(np.repeat(21, len(spaced_ew)), spaced_ew, color='black', size=6, marker='x', legend_label="eigen-value")
  p.xaxis.axis_label = "Iteration number"
  p.yaxis.axis_label = "Rayleigh-Ritz values"
  # p.yaxis.visible = False
  p.toolbar_location = None
  p.legend.location = 'top_left'
  p.legend.orientation = 'horizontal'
  p.legend.padding = 0
  p.legend.label_text_font_size = '10px'
  p.x_range = Range1d(0, 22)
  p.y_range = Range1d(-0.10, 3.65)
  p.add_layout(eigen_axis, 'right')
  sep_line = Span(location=20, dimension='height', line_color='black', line_width=2, line_dash="dotted")
  p.add_layout(sep_line)

  label_0 = r"$$\mathcal{K}_j(A, v) \triangleq \mathrm{span}\{ v \}$$"
  label_1 = r"$$\mathcal{K}_j(A, v) \triangleq \mathrm{span}\{ v, Av \}$$"
  label_2 = r"$$\mathcal{K}_j(A, v) \triangleq \mathrm{span}\{ v, Av, A^2 v \}$$"
  label_3 = r"$$\mathcal{K}_j(A, v) \triangleq \mathrm{span}\{ v, Av, A^2 v, A^3 v \}$$"
  label_4 = r"$$\mathcal{K}_j(A, v) \triangleq \mathrm{span}\{ v, Av, A^2 v, \dots, A^4 v \}$$"
  label_5 = r"$$\mathcal{K}_j(A, v) \triangleq \mathrm{span}\{ v, Av, A^2 v, \dots, A^5 v \}$$"
  label_j = lambda j: r"$$\mathcal{K}_j(A, v) \triangleq \mathrm{span}\{ v, Av, A^2 v, \dots, A^{" + f"{j}" + r"}v \}$$"
  k_labels = [label_0, label_1, label_2, label_3, label_4, label_5]
  
  t_label_0 = r"$$T_1 = \begin{bmatrix} 0 & 0 & & & \\ 0 & 0 & 0 & & \\ & 0 & 0 & \ddots & \\ & & \ddots & \ddots & 0 \\ & & & 0 & 0 \end{bmatrix}$$"
  t_label_1 = r"$$T_1 = \begin{bmatrix} \alpha_1 & \beta_1 & & & \\ \beta_1 & 0 & 0 & & \\ & 0 & 0 & \ddots & \\ & & \ddots & \ddots & 0 \\ & & & 0 & 0 \end{bmatrix}$$"
  t_label_2 = r"$$T_2 = \begin{bmatrix} \alpha_1 & \beta_1 & & & \\ \beta_1 & \alpha_2 & \beta_2 & & \\ & \beta_2 & 0 & \ddots & \\ & & \ddots & \ddots & 0 \\ & & & 0 & 0 \end{bmatrix}$$"
  t_label_3 = r"$$T_3 = \begin{bmatrix} \alpha_1 & \beta_1 & & & \\ \beta_1 & \alpha_2 & \beta_2 & & \\ & \beta_2 & \alpha_3 & \ddots & \\ & & \ddots & \ddots & 0 \\ & & & 0 & 0 \end{bmatrix}$$"
  t_label_j = lambda j: r"$$T_{"+f"{j}"+r"}"+r"= \begin{bmatrix} \alpha_1 & \beta_1 & & & \\ \beta_1 & \alpha_2 & \beta_2 & & \\ & \beta_2 & \alpha_3 & \ddots & \\ & & \ddots & \ddots & "+r"\beta_{"+f"{j}"+r"}"+ r"\\ & & & "+r"\beta_{"+f"{j}"+r"}"+r"& "+r"\alpha_{"+f"{j}"+r"}"+r"\end{bmatrix}$$"
  t_labels = [t_label_0, t_label_1, t_label_2, t_label_3]

  q = figure(width=350, height=300, title="Krylov subspace expansion", x_axis_label='Initial xlabel')
  q.output_backend = "svg"
  krylov_label = Label(
    text=k_labels[frame_id] if frame_id <= 5 else label_j(frame_id),
    x=45, y=200,
    x_units="screen", y_units="screen",
    text_font_size="14px"
  )
  tri_label = Label(
    text=t_labels[frame_id] if frame_id <= 3 else t_label_j(frame_id),
    x=25, y=25,
    x_units="screen", y_units="screen",
  )
  q.title.align = 'center'
  # q.xaxis.axis_label= k_labels[frame_id] if frame_id <= 5 else label_j(frame_id)  
  # q.yaxis.visible = False
  q.toolbar_location = None
  q.add_layout(krylov_label)
  q.add_layout(tri_label)
  # q.xaxis.axis_label = k_labels[frame_id] if frame_id <= 5 else label_j(frame_id)
  plot = row(q, p)
  # show(plot)
  export_svg(
    plot, 
    filename = anim_dir + f"frame_{frame_id}.svg"
  )

#%% 
    

# %% 
def min_weight_matching(list1, list2):
  n = len(list1)
  m = len(list2)
  cost_matrix = np.zeros((n, m))
  for i in range(n):
    for j in range(m):
      cost_matrix[i, j] = abs(list1[i] - list2[j])
  if n < m:
    dummy_row = np.full((1, m), 1e6)
    cost_matrix = np.vstack((cost_matrix, dummy_row))
  row_indices, col_indices = linear_sum_assignment(cost_matrix)
  if n < m:
    row_indices = row_indices[:-1]
  matching = {list1[i]: list2[j] for i, j in zip(row_indices, col_indices)}
  return matching

# eigsh(diags(true_ew), return_eigenvectors=False, maxiter=5)
# %%
# from scipy.sparse import spdiags
  # for x1,x2 in zip(l, np.delete(r, piv)):
  #   p.line(x=[i+1,i+2], y=[x1,x2], color='blue')
  # matching = dict(zip(l, list(r[:piv]) + list(r[(piv+1):])))
  # for x1,x2 in matching.items():
    # p.line(x=[i+1,i+2], y=[x1,x2], color='blue')
