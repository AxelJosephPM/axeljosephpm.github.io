---
layout: post
title: "Por qué comparar vectores no es tan inocente"
date: 2026-05-21
tags: [geometry, differential-geometry, holonomy]
series: "Holonomía, transporte y giroscopios"
series_index: 1
published: true
---

¿Qué significa comparar dos vectores que no viven en el mismo punto?

# Por qué comparar vectores no es tan inocente

Cuando uno empieza a trabajar con geometría diferencial, es tentador arrastrar al nuevo lenguaje muchas intuiciones del espacio euclídeo. En $\mathbb{R}^n$ solemos dibujar vectores en puntos distintos y compararlos sin demasiada preocupación. Decimos que dos vectores son iguales si tienen las mismas componentes, o si apuntan en la misma dirección con la misma longitud. La operación parece tan natural que casi desaparece del discurso.

Pero esa comodidad depende de una estructura que en una variedad general no es tan trivial.

En una variedad diferenciable $M$ la situación cambia. Cada punto $p\in M$ tiene su propio espacio tangente:

$$
T_pM.
$$

Y si tomamos otro punto $q\in M$, entonces los vectores tangentes en $q$ viven en otro espacio:

$$
T_qM.
$$

La notación puede engañar. Es fácil escribir flechas parecidas en dos puntos distintos y tratarlas como si fuesen objetos del mismo tipo. Pero, estrictamente, un vector $v\in T_pM$ y un vector $w\in T_qM$ no pertenecen al mismo espacio vectorial. Antes de compararlos necesitamos explicar qué significa llevar información de un espacio tangente al otro.

Ese es el problema geométrico de partida.

![Dos espacios tangentes en puntos distintos de una variedad]({{ '/assets/images/posts/holonomy_all/espacios-tangentes.png' | relative_url }})

## La variedad no trae una regla de comparación incorporada

Una variedad diferenciable es, de forma intuitiva, un espacio que localmente se parece a $\mathbb{R}^n$. Esto significa que alrededor de cada punto podemos escoger una carta local

$$
\varphi:U\subset M\longrightarrow \varphi(U)\subset\mathbb{R}^n.
$$

Las coordenadas nos permiten calcular, derivar, escribir componentes y parametrizar curvas. Pero no debemos confundir las coordenadas con la geometría en sí. Una carta es una forma de describir localmente la variedad, no una identificación absoluta de todos sus espacios tangentes.

En una carta local $(x^\mu)$, una base natural de $T_pM$ viene dada por los vectores coordenados

$$
\left\{\left.\frac{\partial}{\partial x^\mu}\right|_p\right\}.
$$

Así, un vector tangente en $p$ puede escribirse como

$$
v=v^\mu\left.\frac{\partial}{\partial x^\mu}\right|_p.
$$

Esta expresión recupera la intuición habitual de un vector como un objeto con componentes. Pero hay que entender que tanto las componentes como la base están evaluadas en el punto $p$. Si cambiamos de punto, cambia también el espacio tangente sobre el que estamos trabajando.

Por eso, una expresión como

$$
X=X^\mu\partial_\mu
$$

puede ocultar bastante geometría. Un campo vectorial $X$ asigna a cada punto $p$ un vector $X_p\in T_pM$. Aunque escribamos una única fórmula, el valor del campo en cada punto vive en un espacio tangente distinto.

## El problema aparece incluso al derivar campos vectoriales

La necesidad de una regla de comparación aparece de manera muy clara cuando intentamos derivar un campo vectorial.

Supongamos que en una carta local escribimos

$$
Y=Y^\nu\partial_\nu.
$$

Una primera idea sería derivar simplemente sus componentes $Y^\nu$. Pero hay un matiz que no podemos ignorar. Si cambiamos de coordenadas, no solo cambian las componentes del campo; también cambia la base respecto de la cual esas componentes están escritas.

Dicho de otra forma: la variación de un campo vectorial tiene dos partes mezcladas.

Por un lado, pueden cambiar sus componentes. Por otro, puede cambiar la base local que usamos para describirlo. Una derivada geométrica no puede ignorar este segundo efecto.

Ahí entra la conexión.

## La conexión como regla de comparación

Una conexión afín en el fibrado tangente $TM$ es una operación que permite derivar campos vectoriales de manera compatible con la geometría de la variedad. Formalmente, es una aplicación

$$
\nabla:\mathfrak{X}(M)\times\mathfrak{X}(M)\longrightarrow \mathfrak{X}(M),
\qquad
(X,Y)\longmapsto \nabla_XY,
$$

donde $\mathfrak{X}(M)$ denota el conjunto de campos vectoriales suaves sobre $M$.

El campo $X$ indica la dirección en la que derivamos, mientras que $Y$ es el campo que queremos derivar. La conexión debe satisfacer las propiedades naturales de linealidad en la dirección de derivación, linealidad real en el campo derivado y la regla de Leibniz en el campo derivado. En particular, para $X,Z,Y,W\in\mathfrak{X}(M)$, $f,g\in C^\infty(M)$ y $a,b\in\mathbb{R}$, se cumple:

$$
\nabla_{X+Z}Y=\nabla_XY+\nabla_ZY.
$$

$$
\nabla_{fX}Y=f\nabla_XY.
$$

De forma equivalente, la conexión es $C^\infty(M)$-lineal en el primer argumento:

$$
\nabla_{fX+gZ}Y=f\nabla_XY+g\nabla_ZY.
$$

En el segundo argumento, la conexión es lineal sobre $\mathbb{R}$:

$$
\nabla_X(Y+W)=\nabla_XY+\nabla_XW.
$$

$$
\nabla_X(aY+bW)=a\nabla_XY+b\nabla_XW.
$$

Sin embargo, no es $C^\infty(M)$-lineal en el segundo argumento. En su lugar, satisface la regla de Leibniz:

$$
\nabla_X(fY)=X(f)Y+f\nabla_XY.
$$

De esta forma $\nabla_XY$ mide cómo cambia $Y$ al desplazarnos en la dirección $X$, una vez fijada una regla para comparar espacios tangentes.

![La conexión como regla local para comparar espacios tangentes cercanos]({{ '/assets/images/posts/holonomy_all/conexion-comparacion.png' | relative_url }})

## Los símbolos de conexión no son la geometría completa

En coordenadas locales, la conexión se describe mediante sus coeficientes:

$$
\nabla_{\partial_\mu}\partial_\nu
=
\Gamma^{\rho}_{\mu\nu}\partial_\rho.
$$

Con esta convención, el primer índice inferior indica la dirección en la que derivamos y el segundo el vector de la base que estamos derivando.

Si

$$
X=X^\mu\partial_\mu,
\qquad
Y=Y^\nu\partial_\nu,
$$

entonces

$$
\nabla_XY
=
X^\mu\left(\partial_\mu Y^\rho+\Gamma^{\rho}_{\mu\nu}Y^\nu\right)\partial_\rho.
$$

Por tanto, las componentes de la derivada covariante de $Y$ son

$$
\nabla_\mu Y^\rho
=
\partial_\mu Y^\rho+\Gamma^{\rho}_{\mu\nu}Y^\nu.
$$

Esta expresión separa muy bien las dos partes del problema. El término $\partial_\mu Y^\rho$ mide la variación ordinaria de las componentes. El término $\Gamma^{\rho}_{\mu\nu}Y^\nu$ corrige el cambio de la base local.

Aquí conviene hacer una advertencia: los coeficientes $\Gamma^{\rho}_{\mu\nu}$ no son, por sí solos, las componentes de un tensor. Dependen de la carta elegida. Por eso debemos leerlos como la manera local de escribir la conexión:

$$
\nabla_{\partial_\mu}\partial_\nu
=
\Gamma^{\rho}_{\mu\nu}\partial_\rho.
$$


## La conexión de Levi-Civita

Cuando la variedad posee una métrica $g$, existe una conexión especialmente importante: la conexión de Levi-Civita. Es la única conexión que cumple simultáneamente dos condiciones:

$$
\nabla g=0,
$$

y

$$
T(X,Y)=0.
$$

La primera condición expresa compatibilidad métrica. Significa que el transporte asociado a la conexión preserva productos internos, normas y ortogonalidad. La segunda expresa ausencia de torsión.

En coordenadas locales, los coeficientes de la conexión de Levi-Civita vienen dados por

$$
\Gamma^{\rho}_{\mu\nu}
=
\frac{1}{2}g^{\rho\sigma}
\left(
\partial_\mu g_{\nu\sigma}
+
\partial_\nu g_{\mu\sigma}
-
\partial_\sigma g_{\mu\nu}
\right).
$$

Esta será la conexión natural en geometría riemanniana y también en relatividad general, donde la métrica ya no es definida positiva, sino lorentziana.

## En resumen
Todo lo anterior puede resumirse en una idea:

> Una variedad diferencial nos da espacios tangentes punto a punto, pero no nos da por sí sola una identificación canónica entre ellos.

La conexión aparece para llenar ese hueco. Permite derivar campos vectoriales, comparar direcciones infinitesimalmente y formular después una noción precisa de transporte paralelo.

Una vez tenemos una regla de comparación local, podemos preguntar qué ocurre si transportamos un vector a lo largo de una curva. La respuesta no solo dependerá del punto inicial y final, sino también del camino recorrido.

Cuando ese camino se cierre, aparecerá el fenómeno que nos interesa: El vector puede volver al mismo punto sin volver igual.

Ahí empieza la holonomía.

## Bibliografía del capítulo

1. Garay, L. J. *Lecture Notes on Differential Geometry*. Universidad Complutense de Madrid.

2. Carroll, S. M. *Lecture Notes on General Relativity*. arXiv:gr-qc/9712019.

3. Wald, R. M. *General Relativity*. University of Chicago Press, 1984.
