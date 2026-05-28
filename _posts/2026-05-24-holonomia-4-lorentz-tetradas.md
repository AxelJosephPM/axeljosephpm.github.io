---
layout: post
title: "Holonomía en relatividad general: tetradas y observadores"
date: 2026-05-24
tags: [general-relativity, tetrads, holonomy]
series: "Holonomía, transporte y giroscopios"
series_index: 4
published: true
---

En geometría riemanniana la holonomía puede imaginarse como una rotación acumulada. En relatividad general, esa misma idea actúa sobre marcos locales, conos de luz y observadores.

# Holonomía en relatividad general: tetradas y observadores

Hasta ahora la discusión ha sido suficientemente general como para aplicarse tanto a geometría riemanniana como a geometría pseudo-riemanniana. Las nociones de conexión, transporte paralelo, curvatura y holonomía no dependen por sí mismas de que la métrica sea definida positiva.

Sin embargo, al pasar al caso lorentziano cambia la interpretación de todo el formalismo.

La cadena geométrica sigue siendo la misma:

$$
\text{conexión}
\longrightarrow
\text{transporte paralelo}
\longrightarrow
\text{curvatura}
\longrightarrow
\text{holonomía}.
$$

Lo que cambia es el tipo de geometría lineal que vive en cada espacio tangente. En relatividad general, cada $T_pM$ no es simplemente un espacio euclídeo infinitesimal. Es un espacio vectorial con métrica de Lorentz, con direcciones temporales, espaciales y nulas. Por eso la holonomía deja de ser solo una rotación geométrica abstracta y pasa a actuar sobre la estructura causal local del espacio-tiempo.

## Del caso riemanniano al caso lorentziano

En una variedad riemanniana $(M,g)$, la métrica es definida positiva. Para todo vector no nulo $v\in T_pM$ se cumple

$$
g_p(v,v)>0.
$$

Esto permite hablar de longitudes, ángulos y ortogonalidad de forma parecida a como lo hacemos en geometría euclídea. Si la conexión es compatible con la métrica, el transporte paralelo preserva esos productos internos y las transformaciones de holonomía pueden interpretarse como rotaciones generalizadas:

$$
\operatorname{Hol}_p(\nabla)\subseteq O(n).
$$

En una variedad lorentziana, en cambio, la métrica tiene signatura

$$
(-,+,+,+)
$$

en dimensión cuatro. Con esta convención, un vector $v\in T_pM$ puede ser:

$$
\begin{cases}
\text{Temporal}, & g_p(v,v)<0,\\
\text{Espacial}, & g_p(v,v)>0,\\
\text{Nulo}, & g_p(v,v)=0.
\end{cases}
$$

Los vectores nulos forman el cono de luz en $T_pM$. Ese cono separa las direcciones temporales de las espaciales y codifica la estructura causal local.

El transporte paralelo asociado a la conexión de Levi-Civita sigue preservando la métrica, pero ahora preservar la métrica significa preservar la estructura lorentziana. Por tanto,

$$
\operatorname{Hol}_p(\nabla)\subseteq O(1,3)
$$

en un espacio-tiempo de dimensión cuatro.

Esto significa que las transformaciones de holonomía pueden cambiar la orientación de vectores y marcos locales, pero no pueden destruir el carácter causal de los vectores. Un vector temporal no puede convertirse en espacial mediante una transformación que preserve la métrica de Lorentz.

![Comparacion entre geometria riemanniana y geometria lorentziana]({{ '/assets/images/posts/holonomy_all/riemann-vs-lorentz.png' | relative_url }})

## Por qué necesitamos marcos locales

En relatividad general, las coordenadas son herramientas de descripción, no observadores físicos. Una carta local nos permite etiquetar sucesos, pero un observador mide componentes respecto de su propio sistema de referencia local.

Por eso conviene introducir marcos locales.

En lugar de trabajar únicamente con la base coordenada

$$
\left\{\frac{\partial}{\partial x^\mu}\right\},
$$

podemos escoger una base local de campos vectoriales

$$
\{e_a\}_{a=0,1,2,3}.
$$

En una variedad lorentziana, la elección más importante es la de un marco ortonormal:

$$
g(e_a,e_b)=\eta_{ab},
$$

donde

$$
\eta_{ab}=\operatorname{diag}(-1,1,1,1).
$$

Una base de este tipo recibe el nombre de **tetrada**.

Las coordenadas describen cómo etiquetamos puntos de la variedad; las tetradas describen cómo un observador descompone localmente los vectores en una dirección temporal y tres direcciones espaciales.

## Campos de marcos y co-marcos

Sea $U\subset M$ un abierto de la variedad. Un campo de marcos local sobre $U$ es una familia de campos vectoriales

$$
\{e_a\}_{a=0}^{3}
$$

tal que, para cada punto $p\in U$, el conjunto $\{(e_a)_p\}_{a=0}^{3}$ forma una base de $T_pM$.

A cada marco local se le asocia un co-marco dual

$$
\{\theta^a\}_{a=0}^{3},
$$

definido por

$$
\theta^a(e_b)=\delta^a_b.
$$

Así, cualquier vector $V\in T_pM$ puede escribirse como

$$
V=V^a e_a,
$$

y sus componentes en el marco vienen dadas por

$$
V^a=\theta^a(V).
$$

Si $(x^\mu)$ es una carta local, cada vector del marco puede expresarse como

$$
e_a=e_a{}^\mu\frac{\partial}{\partial x^\mu},
$$

mientras que el co-marco se escribe como

$$
\theta^a=e^a{}_{\mu}dx^\mu.
$$

Los coeficientes de la tetrada relacionan el lenguaje coordenado con el lenguaje de marcos. En el caso ortonormal satisfacen

$$
g_{\mu\nu}e_a{}^\mu e_b{}^\nu=\eta_{ab}.
$$

Equivalentemente,

$$
g_{\mu\nu}=\eta_{ab}e^a{}_{\mu}e^b{}_{\nu}.
$$

## Tetradas adaptadas a observadores

Una tetrada adaptada a un observador se escribe como

$$
\{e_0,e_1,e_2,e_3\},
$$

donde $e_0$ representa la dirección temporal local del observador y los vectores $e_i$, con $i=1,2,3$, representan sus direcciones espaciales locales.

Si $u$ es la cuadrivelocidad del observador, una tetrada adaptada cumple

$$
e_0=u,
\qquad
g(u,u)=-1.
$$

Los vectores espaciales satisfacen

$$
g(e_i,e_j)=\delta_{ij},
\qquad
g(u,e_i)=0.
$$

De esta forma, el espacio tangente se descompone localmente como

$$
T_pM=\operatorname{span}(u)\oplus u^\perp.
$$

Esta descomposición depende del observador. Dos observadores con distinta cuadrivelocidad no tienen, en general, la misma separación entre tiempo y espacio.

Este punto es fundamental para interpretar giroscopios y precesión. Un eje de espín no es simplemente un vector abstracto. Es una dirección espacial medida por un observador concreto. Para hablar de rotación o de precesión hay que especificar respecto de qué tetrada se está realizando la comparación.

![Tetrada local asociada a un observador a lo largo de su linea de universo]({{ '/assets/images/posts/holonomy_all/tetrada-observador.png' | relative_url }})

## La conexión en el lenguaje de marcos

La conexión también puede escribirse respecto de un marco local. Si $\nabla$ es una conexión, se definen las formas de conexión $\omega^a{}_b$ mediante

$$
\nabla e_b=\omega^a{}_b\otimes e_a.
$$

Equivalente, al derivar $e_b$ en la dirección de un vector $X$,

$$
\nabla_Xe_b=\omega^a{}_b(X)e_a.
$$

En una base coordenada, la conexión se describe mediante los símbolos de Christoffel. En un marco local, la misma información geométrica se recoge en las formas de conexión. La ventaja del segundo lenguaje es que permite interpretar directamente cómo cambia el marco local al moverse por el espacio-tiempo.

Si el marco es ortonormal y la conexión es compatible con la métrica, las formas de conexión satisfacen una condición de antisimetría:

$$
\omega_{ab}=-\omega_{ba},
$$

donde los índices se bajan con $\eta_{ab}$.

Esta antisimetría expresa que la conexión preserva la ortonormalidad del marco. En otras palabras, el transporte no rompe la estructura local de Minkowski.

## Cartan: torsión y curvatura en lenguaje de formas

El formalismo de marcos permite escribir la torsión y la curvatura mediante formas diferenciales. La primera ecuación estructural de Cartan es

$$
\Theta^a=d\theta^a+\omega^a{}_b\wedge\theta^b,
$$

donde $$\Theta^a$$ son las formas de torsión.

Para la conexión de Levi-Civita, la torsión se anula:

$$
\Theta^a=0.
$$

Por tanto,

$$
d\theta^a+\omega^a{}_b\wedge\theta^b=0.
$$

La segunda ecuación estructural de Cartan define las formas de curvatura:

$$
\Omega^a{}_b=d\omega^a{}_b+\omega^a{}_c\wedge\omega^c{}_b.
$$

Estas formas contienen las componentes del tensor de Riemann en el marco local:

$$
\Omega^a{}_b=\frac{1}{2}R^a{}_{bcd}\theta^c\wedge\theta^d.
$$

Esta formulación encaja de forma natural con la holonomía. La conexión describe cómo evoluciona un marco local al movernos por la variedad. La curvatura mide el defecto infinitesimal asociado a esa evolución alrededor de lazos pequeños. La holonomía recoge el resultado finito de transportar el marco alrededor de lazos cerrados.

![Relacion entre co-marco, conexion, curvatura y holonomia en el formalismo de Cartan]({{ '/assets/images/posts/holonomy_all/cartan-conexion-curvatura.png' | relative_url }})

## La física de la holonomía lorentziana

En el caso riemanniano, un ejemplo típico de holonomía es una rotación acumulada al transportar un vector sobre una superficie curva. En relatividad general, el objeto transportado puede ser un marco de observador.

Esto cambia la lectura del fenómeno. La holonomía puede describir cómo una tetrada local vuelve transformada después de recorrer una curva cerrada o después de comparar marcos a lo largo de una trayectoria. Esa transformación debe preservar la métrica de Lorentz, pero puede mezclar direcciones temporales y espaciales mediante transformaciones lorentzianas.

La consecuencia conceptual es que la holonomía no solo habla de geometría abstracta. En un espacio-tiempo curvo, habla de cómo cambian las referencias locales usadas por observadores para medir tiempo, espacio y orientación.

Por eso, para llegar a los giroscopios necesitamos un último ingrediente: una forma precisa de decir cuándo un marco llevado por un observador no está rotando localmente. Esa noción no será simplemente el transporte paralelo en todos los casos, porque un observador puede estar acelerado.

La herramienta adecuada será el transporte de Fermi--Walker.

## Bibliografía del capítulo

1. Garay, L. J. *Lecture Notes on Differential Geometry*. Universidad Complutense de Madrid.

2. Garay, L. J. *General Relativity*. Lecture notes. Universidad Complutense de Madrid.

3. Carroll, S. M. *Lecture Notes on General Relativity*. arXiv:gr-qc/9712019.

4. Wald, R. M. *General Relativity*. University of Chicago Press, 1984.

5. Misner, C. W.; Thorne, K. S.; Wheeler, J. A. *Gravitation*. W. H. Freeman, 1973.

6. Janssen, B. *Relatividad General*. Universidad de Granada.
