---
layout: post
title: "Transportar un vector y volver distinto: la idea de holonomía"
date: 2026-05-22
tags:
  - geometry
  - holonomy
  - parallel-transport
series: Holonomía, transporte y giroscopios
series_index: 2
published: true
---

La holonomía empieza con una situación aparentemente sencilla "transportamos un vector a lo largo de una curva cerrada y, al regresar al punto inicial, el vector puede no coincidir con el de partida".

# Transportar un vector para poder compararlo

En el capítulo anterior apareció el problema de comparar vectores situados en puntos distintos de una variedad. Si $p,q\in M$, entonces un vector $v\in T_pM$ y un vector $w\in T_qM$ pertenecen a espacios vectoriales distintos. Antes de compararlos,  vemos obvio que necesitamos una forma de llevar uno de ellos al espacio tangente del otro.

La conexión proporciona precisamente esa regla. Dada una curva que une $p$ con $q$, permite transportar vectores desde $T_pM$ hasta $T_qM$ manteniéndolos paralelos respecto de la conexión elegida. Esta operación recibe el nombre de **transporte paralelo**.

La palabra “paralelo” no significa aquí que las componentes ordinarias del vector permanezcan constantes. Significa que el vector no cambia covariantemente a lo largo de la curva. Es decir, el vector se desplaza siguiendo la regla de comparación determinada por la conexión.

El punto importante es que el transporte paralelo depende, en general, de la curva escogida. Dos caminos distintos entre los mismos puntos pueden producir vectores finales distintos. Esta dependencia del camino es la primera señal de que la geometría de la variedad está interviniendo de forma no trivial.

## Transporte paralelo a lo largo de una curva

Sea

$$
\gamma:I\subset\mathbb{R}\longrightarrow M
$$

una curva suave en la variedad, y sea $V(t)$ un campo vectorial definido solamente a lo largo de esa curva. Esto significa que para cada valor del parámetro $t$ tenemos

$$
V(t)\in T_{\gamma(t)}M.
$$

La derivada covariante de $V$ a lo largo de la curva se define como

$$
\frac{DV}{dt}:=\nabla_{\dot\gamma}V.
$$

Diremos que $V(t)$ es transportado paralelamente a lo largo de $\gamma$ si

$$
\frac{DV}{dt}=0,
$$

es decir,

$$
\nabla_{\dot\gamma}V=0.
$$

En coordenadas locales, si

$$
V(t)=V^\rho(t)\partial_\rho\big|_{\gamma(t)},
\qquad
\dot\gamma(t)=\frac{dx^\mu}{dt}\partial_\mu\big|_{\gamma(t)},
$$

entonces la ecuación de transporte paralelo toma la forma

$$
\frac{dV^\rho}{dt}
+
\Gamma^{\rho}_{\mu\nu}\frac{dx^\mu}{dt}V^\nu
=0.
$$

La fórmula muestra de nuevo la misma estructura: una parte ordinaria, $dV^\rho/dt$, y una corrección geométrica, codificada por los coeficientes de conexión.

Fijada una curva y un vector inicial

$$
V(t_0)=v\in T_{\gamma(t_0)}M,
$$

la ecuación determina de forma única el vector transportado en cada punto de la trayectoria. En particular, define una aplicación lineal entre los espacios tangentes de los extremos:

$$
P_\gamma:T_{\gamma(t_0)}M\longrightarrow T_{\gamma(t_1)}M.
$$

A cada vector inicial le asigna el vector final obtenido al transportarlo paralelamente por la curva.

![Transporte paralelo de un vector a lo largo de una curva]({{ '/assets/images/posts/holonomy_all/transporte-paralelo-curva.png' | relative_url }})

## Lo importante no es solo el transporte, sino el camino

Una vez fijada la conexión y la curva, el transporte paralelo está bien definido. Pero el resultado puede depender del camino. Dos curvas distintas que unen los mismos puntos pueden producir dos aplicaciones de transporte distintas.

Este hecho es el primer indicio de que la geometría de la variedad está entrando de forma no trivial. En un espacio plano y simplemente conectado, uno espera que transportar un vector de $p$ a $q$ sea independiente del camino. En una geometría curva, esa independencia deja de estar garantizada.

El fenómeno se vuelve especialmente claro cuando el camino es cerrado.

Sea

$$
\gamma:[0,1]\longrightarrow M
$$

una curva suave tal que

$$
\gamma(0)=\gamma(1)=p.
$$

Entonces $\gamma$ es un lazo basado en $p$. Al transportar un vector alrededor de ese lazo, el punto inicial y el punto final coinciden. Por tanto, el transporte paralelo ya no relaciona dos espacios tangentes distintos, sino que define una transformación lineal del propio espacio tangente inicial:

$$
P_\gamma:T_pM\longrightarrow T_pM.
$$

Ahora sí podemos comparar directamente el vector inicial con el vector final, porque ambos pertenecen al mismo espacio vectorial.

Si $$v\in T_pM$$ es el vector inicial, puede suceder que

$$
P_\gamma(v)\neq v.
$$

La diferencia

$$
\Delta_\gamma v:=P_\gamma(v)-v
$$

puede interpretarse como un **defecto de retorno** asociado al lazo $\gamma$ y al vector $v$.

Este defecto no es un fallo del cálculo ni un problema de coordenadas. Durante todo el recorrido el vector ha cumplido la ecuación de transporte paralelo. Lo que ocurre es que la geometría acumulada a lo largo del lazo puede producir una transformación no trivial al regresar al punto inicial.

## El ejemplo de la esfera

El ejemplo clásico es el transporte paralelo sobre una esfera. Imaginemos un vector tangente que se desplaza siguiendo un triángulo esférico cerrado. En cada tramo lo transportamos paralelamente según la geometría de la superficie. Al volver al punto de partida, el vector puede aparecer rotado respecto de su orientación inicial.

No ha habido ningún torque externo ni ninguna rotación artificial impuesta a mano. La rotación final es una consecuencia del transporte sobre una superficie curva.

![Defecto de retorno al transportar un vector sobre un triangulo esferico]({{ '/assets/images/posts/holonomy_all/triangulo-esferico-defecto.png' | relative_url }})

## Definición del grupo de holonomía

La holonomía aparece al considerar todos los lazos cerrados basados en un punto.  
  
Fijada una conexión $\nabla$, el grupo de holonomía en $p$ se define como  

$$  
\operatorname{Hol}_p(\nabla)  
=  
\left\{P_\gamma\in GL(T_pM)\;\middle|\;\gamma\text{ es un lazo basado en }p\right\},  
$$

siendo $GL(T_pM)$ el grupo lineal general de $T_pM$, es decir, el conjunto de todas las aplicaciones lineales invertibles de $T_pM$ en sí mismo.  
  
Esta definición contiene varias ideas importantes.

Primero, la holonomía no es un número ni una única rotación. Es un conjunto de transformaciones lineales.

Segundo, esas transformaciones no se eligen libremente. Vienen producidas por transporte paralelo alrededor de lazos cerrados.

Tercero, el conjunto tiene estructura de grupo. El lazo trivial produce la identidad. Recorrer un lazo en sentido contrario produce la transformación inversa. Recorrer dos lazos sucesivamente corresponde a componer las transformaciones de transporte.

De forma esquemática tenemos que:

$$
P_{\gamma_0}=\operatorname{id}_{T_pM},
$$

$$
P_{\gamma^{-1}}=P_\gamma^{-1},
$$

$$
P_{\gamma_2\circ\gamma_1}=P_{\gamma_2}\circ P_{\gamma_1}.
$$

Por tanto,

$$
\operatorname{Hol}_p(\nabla)\leq GL(T_pM).
$$

La holonomía organiza todas las maneras en que la geometría puede transformar vectores al cerrar caminos.

## Dependencia del punto base

La definición depende del punto base $p$, porque todos los lazos empiezan y terminan en ese punto y las transformaciones actúan sobre $T_pM$. Pero si la variedad es conexa, los grupos de holonomía en puntos distintos están relacionados de manera natural.

Si $\alpha$ es una curva que une $p$ con $q$, el transporte paralelo a lo largo de $\alpha$ define un isomorfismo

$$
P_\alpha:T_pM\longrightarrow T_qM.
$$

Bajo esa identificación, la holonomía en $q$ queda relacionada con la holonomía en $p$ por conjugación:

$$
\operatorname{Hol}_q(\nabla)
=
P_\alpha\operatorname{Hol}_p(\nabla)P_\alpha^{-1}.
$$

## Holonomía completa y holonomía restringida

Hay una distinción que hay que tener presente. El grupo completo $$\operatorname{Hol}_p(\nabla)$$ se obtiene considerando todos los lazos cerrados basados en $p$. En cambio, la holonomía restringida se obtiene considerando solo los lazos contractibles, es decir, aquellos que pueden deformarse continuamente hasta el lazo trivial:

$$
\operatorname{Hol}^0_p(\nabla)\subseteq\operatorname{Hol}_p(\nabla).
$$

La holonomía restringida recoge la parte conectada del fenómeno y está ligada de manera más directa a la curvatura local. La holonomía completa puede contener además información global asociada a la topología de la variedad.

Esta distinción es útil porque separa dos fuentes. Una puede venir de la curvatura local. Otra puede venir de la estructura global del espacio.

## Si hay métrica, la holonomía queda restringida

Cuando la conexión es compatible con una métrica $g$, el transporte paralelo preserva el producto métrico. Si $u,v\in T_pM$, entonces

$$
g_p(P_\gamma u,P_\gamma v)=g_p(u,v).
$$

Por tanto, las transformaciones de holonomía no son transformaciones lineales arbitrarias.

En una variedad riemanniana de dimensión $n$,

$$
\operatorname{Hol}_p(\nabla)\subseteq O(n).
$$

En una variedad lorentziana de dimensión $n$,

$$
\operatorname{Hol}_p(\nabla)\subseteq O(1,n-1).
$$

En una geometría lorentziana, la holonomía puede transformar marcos locales, pero debe preservar la métrica de Lorentz y, con ella, la estructura causal.

## En resumen

> Una conexión asigna a cada curva una transformación de transporte. Si la curva se cierra, esa transformación actúa sobre un único espacio tangente. La holonomía es el grupo formado por todas esas transformaciones cerradas.

La siguiente pregunta es inevitable: ¿de dónde sale localmente ese defecto de retorno?

La respuesta será la curvatura.

## Bibliografía del capítulo

1. Garay, L. J. *Lecture Notes on Differential Geometry*. Universidad Complutense de Madrid.

2. Carroll, S. M. *Lecture Notes on General Relativity*. arXiv:gr-qc/9712019.

3. Wald, R. M. *General Relativity*. University of Chicago Press, 1984.

4. Schwachhöfer, L. J. *Holonomy*. Lecture notes.
