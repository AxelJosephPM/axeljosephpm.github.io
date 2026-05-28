---
layout: post
title: "Giroscopios como testigos de la geometría del espacio-tiempo"
date: 2026-05-25
tags: [general-relativity, gyroscopes, holonomy]
series: "Holonomía, transporte y giroscopios"
series_index: 5
published: true
---

# Giroscopios como prueba de la geometría del espacio-tiempo

Hasta ahora hemos tratado la holonomía como una construcción geométrica: una conexión permite transportar vectores, la curvatura mide el defecto infinitesimal al cerrar lazos pequeños, y la holonomía organiza las transformaciones acumuladas por transporte paralelo.

En relatividad general, esta estructura adquiere una interpretación física más directa. Los vectores del espacio-tiempo pueden representar velocidades, direcciones espaciales medidas por un observador, ejes de referencia locales o el eje de un giroscopio ideal.

En un giroscopio, su eje define una dirección espacial local, y la evolución de esa dirección a lo largo de una línea de universo permite comparar el lenguaje geométrico del transporte con un efecto físico medible.

En este capítulo usaremos los giroscopios como cierre de la discusión. Primero distinguiremos el transporte paralelo del transporte de Fermi--Walker. Después veremos cómo la precesión de un eje transportado puede interpretarse como una manifestación física de la geometría del espacio-tiempo.

## El problema de un marco no rotante

En relatividad general, un observador se representa mediante una línea de universo

$$
\gamma(\tau),
$$

parametrizada por el tiempo propio $\tau$. Su cuadrivelocidad es

$$
u=\dot\gamma,
\qquad
g(u,u)=-1.
$$

En cada punto de la línea de universo, el observador tiene un espacio local de reposo:

$$
u^\perp
=
\{X\in T_{\gamma(\tau)}M\mid g(X,u)=0\}.
$$

Este subespacio contiene las direcciones espaciales que el observador puede medir instantáneamente.

Si queremos describir un sistema de ejes llevado por el observador, introducimos una tetrada adaptada

$$
\{e_0,e_1,e_2,e_3\},
\qquad
e_0=u,
$$

con

$$
g(e_i,e_j)=\delta_{ij},
\qquad
g(u,e_i)=0.
$$

Pero hasta aquí solo hemos descrito el marco en cada instante. Pero todavía falta una cuestión esencial ¿Cómo se relaciona el marco en un punto de la línea de universo con el marco en el punto siguiente?

En cada espacio de reposo $u^\perp$ podemos elegir muchas bases ortonormales distintas, relacionadas entre sí por rotaciones espaciales. Por tanto, decir que $\{e_1,e_2,e_3\}$ es una base espacial adaptada al observador no determina, por sí solo, si esos ejes están rotando o no a lo largo de la trayectoria.

El problema consiste entonces en definir una regla de transporte para los ejes espaciales que cumpla dos condiciones. Primero, que los mantenga dentro del espacio de reposo instantáneo del observador:

$$
g(e_i,u)=0.
$$

Segundo, que no introduzca una rotación espacial propia del marco. Es decir, si los ejes cambian, ese cambio debe deberse al movimiento del observador y a la geometría del espacio-tiempo, no a una rotación arbitraria añadida.

El transporte paralelo parece una primera opción natural, pero no siempre resuelve este problema. Si el observador tiene aceleración

$$
a=\nabla_u u,
$$

y un vector espacial $S$ se transporta paralelamente,

$$
\nabla_u S=0,
$$

entonces la variación de su ortogonalidad con $u$ viene dada por

$$
\frac{d}{d\tau}g(S,u)
=
g(\nabla_u S,u)+g(S,\nabla_u u)
=
g(S,a).
$$

Por tanto, si $a\neq 0$, un vector inicialmente ortogonal a $u$ no tiene por qué seguir siendo ortogonal a $u$ bajo transporte paralelo. Dicho de otro modo: para observadores acelerados, el transporte paralelo puede sacar los vectores espaciales del espacio de reposo instantáneo.

Necesitamos una regla que corrija precisamente ese efecto: debe preservar la ortogonalidad respecto de $u$ y, al mismo tiempo, evitar una rotación espacial artificial del marco.

Esa regla es el transporte de Fermi--Walker.

![Marco transportado por Fermi-Walker a lo largo de una linea de universo acelerada]({{ '/assets/images/posts/holonomy_all/marco-fermi-walker.png' | relative_url }})

## Transporte de Fermi--Walker

Queremos una regla de transporte adecuada para los ejes espaciales de un observador. Esa regla debe cumplir tres condiciones naturales.

Primero, si un vector es espacial para el observador, debe seguir siéndolo. Es decir, si inicialmente

$$
g(X,u)=0,
$$

la evolución debe preservar esa ortogonalidad.

Segundo, debe preservar longitudes y ángulos entre los ejes espaciales. Si dos vectores forman parte del marco del observador, no queremos que el transporte cambie artificialmente sus productos escalares.

Tercero, no debe introducir una rotación espacial propia. El marco puede cambiar porque el observador acelera o porque la geometría del espacio-tiempo interviene, pero no porque hayamos añadido una rotación arbitraria de los ejes.

Sea $X$ un campo vectorial definido a lo largo de la línea de universo $\gamma(\tau)$. La aceleración propia del observador es

$$
a=\nabla_u u.
$$

Si el observador está acelerado, el transporte paralelo no basta para preservar el espacio local de reposo. En efecto, si $X$ es transportado paralelamente,

$$
\nabla_uX=0,
$$

entonces

$$
\frac{d}{d\tau}g(X,u)
=
g(\nabla_uX,u)+g(X,\nabla_u u)
=
g(X,a).
$$

Por tanto, aunque $X$ sea inicialmente ortogonal a $u$, puede dejar de serlo cuando $a\neq 0$.

La idea del transporte de Fermi--Walker es corregir exactamente ese efecto. Para un vector espacial, la condición adecuada es

$$
\nabla_uX=g(X,a)u.
$$

Veamos por qué. Si $g(X,u)=0$, entonces

$$
\frac{d}{d\tau}g(X,u)
=
g(\nabla_uX,u)+g(X,a).
$$

Sustituyendo la condición anterior,

$$
\frac{d}{d\tau}g(X,u)
=
g(g(X,a)u,u)+g(X,a).
$$

Como $g(u,u)=-1$, queda

$$
\frac{d}{d\tau}g(X,u)
=
-g(X,a)+g(X,a)
=
0.
$$

Así, el término $g(X,a)u$ es precisamente la corrección necesaria para que un vector espacial siga perteneciendo al espacio local de reposo del observador.

Para escribir esta regla de forma válida para cualquier vector $X$, se define la derivada de Fermi--Walker como

$$
\frac{D_{\mathrm{FW}}X}{d\tau}
=
\nabla_uX-g(X,a)u+g(X,u)a.
$$

Diremos que $X$ es transportado por Fermi--Walker si

$$
\frac{D_{\mathrm{FW}}X}{d\tau}=0.
$$

Equivalentemente,

$$
\nabla_uX=g(X,a)u-g(X,u)a.
$$

En particular, si $X$ es espacial para el observador, es decir, si

$$
g(X,u)=0,
$$

recuperamos

$$
\nabla_uX=g(X,a)u.
$$

Esta es la razón por la que el transporte de Fermi--Walker es el transporte indicado para marcos locales no rotantes, conserva el espacio de reposo del observador y elimina la parte de la evolución que correspondería a una rotación espacial arbitraria.

## Qué preserva Fermi--Walker

El transporte de Fermi--Walker preserva productos escalares. Si $X$ e $Y$ son transportados por Fermi--Walker, entonces

$$
\frac{d}{d\tau}g(X,Y)=0.
$$

En particular, preserva normas:

$$
\frac{d}{d\tau}g(X,X)=0.
$$

También preserva la ortogonalidad respecto de la cuadrivelocidad. Si inicialmente

$$
g(u,X)=0,
$$

y $X$ es transportado por Fermi--Walker, entonces esa condición se mantiene a lo largo de la trayectoria.

Por tanto, un vector inicialmente espacial para el observador sigue siendo espacial.

Esto permite definir un marco localmente no rotante. Una tetrada adaptada $\{u,e_1,e_2,e_3\}$ será no rotante si sus ejes espaciales satisfacen

$$
\frac{D_{\mathrm{FW}}e_i}{d\tau}=0,
\qquad i=1,2,3.
$$

La idea aquí es que la aceleración del observador puede cambiar la orientación del espacio de reposo dentro del espacio-tiempo, pero no debe introducir una rotación interna de los ejes espaciales entre sí.

## Relación con el transporte paralelo

Fermi--Walker no sustituye al transporte paralelo en todos los contextos. Lo generaliza para observadores acelerados.

Si el observador sigue una geodésica, entonces

$$
a=\nabla_u u=0.
$$

En ese caso,

$$
\frac{D_{\mathrm{FW}}X}{d\tau}=\nabla_uX.
$$

Por tanto,

$$
\frac{D_{\mathrm{FW}}X}{d\tau}=0
\qquad\Longleftrightarrow\qquad
\nabla_uX=0.
$$

Para observadores en caída libre, el transporte de Fermi--Walker coincide con el transporte paralelo.

## El eje de un giroscopio ideal

Un giroscopio ideal sin torques externos proporciona una dirección espacial local que se mantiene sin rotación propia. Si $S(\tau)$ representa su eje de espín, entonces $S$ es ortogonal a la cuadrivelocidad del giroscopio:

$$
g(S,u)=0.
$$

En ausencia de torques, el eje de espín se transporta por Fermi--Walker:

$$
\frac{D_{\mathrm{FW}}S}{d\tau}=0.
$$

Usando la definición anterior,

$$
\nabla_uS-g(S,a)u+g(S,u)a=0.
$$

Como $g(S,u)=0$, queda

$$
\nabla_uS=g(S,a)u.
$$

Si además el giroscopio está en caída libre, $a=0$, y la ecuación se reduce a

$$
\nabla_uS=0.
$$

Es decir, el eje de espín de un giroscopio libre en caída libre es transportado paralelamente por la conexión de Levi-Civita.

Un giroscopio ideal puede actuar como una realización física del transporte paralelo de una dirección espacial a lo largo de una línea de universo.

![Eje de espin de un giroscopio transportado a lo largo de una orbita]({{ '/assets/images/posts/holonomy_all/giroscopio-transporte.png' | relative_url }})

## Precesión como comparación de marcos

En relatividad general no existe, en general, una noción global absoluta de “dirección fija”. Lo que llamamos precesión aparece al comparar el eje del giroscopio con algún marco de referencia elegido.

Sea $\{e_0,e_1,e_2,e_3\}$ una tetrada adaptada a un observador, con $e_0=u$. Si escribimos el eje de espín como

$$
S=S^i e_i,
$$

entonces la evolución de las componentes $S^i$ depende de dos cosas:

1. Cómo se transporta físicamente $S$;
2. Cómo evoluciona el marco $\{e_i\}$ respecto del cual medimos sus componentes.

Si el marco no es de Fermi--Walker, puede estar rotando respecto de un giroscopio ideal. Esa rotación del marco aparecerá como una precesión de las componentes del eje de espín.

## Precesión geodésica

El caso más limpio aparece cuando el giroscopio está en caída libre. Entonces su línea de universo es geodésica,

$$
a=\nabla_u u=0,
$$

y el transporte de Fermi--Walker se reduce al transporte paralelo:

$$
\nabla_u S=0.
$$

Desde el punto de vista local, el giroscopio no está girando por la acción de un torque. Su eje de espín se limita a seguir la regla natural de transporte dada por la conexión de Levi-Civita.

Sin embargo, esto no significa que su orientación permanezca constante respecto de cualquier marco de comparación. Si el giroscopio recorre una órbita alrededor de una masa y comparamos su eje con un marco definido a lo largo de la trayectoria, o con direcciones fijadas asintóticamente lejos de la fuente, puede aparecer una variación acumulada.

Esta es la idea detrás de la **precesión geodésica**, también llamada precesión de de Sitter. No surge porque el giroscopio tenga una rotación propia añadida, sino porque el transporte paralelo en un espacio-tiempo curvo depende de la trayectoria seguida.

En una aproximación de campo débil alrededor de una masa esférica $M$, la velocidad angular asociada a esta precesión puede escribirse de forma orientativa como

$$
\boldsymbol{\Omega}_{\mathrm{dS}}
\simeq
\frac{3GM}{2c^2r^3}\,\mathbf{r}\times\mathbf{v}.
$$

Esta expresión resume el efecto en el límite newtoniano relativista, pero la lectura geométrica es la que conecta nos con la holonomía: Al transportar una dirección espacial a lo largo de una curva en un espacio-tiempo curvo, la comparación final con un marco de referencia puede mostrar una rotación acumulada.

En ese sentido, la precesión geodésica es una manifestación física de la misma idea que venimos desarrollando: El transporte paralelo alrededor de una trayectoria no tiene por qué devolver la misma orientación relativa.

## Arrastre de marcos

La precesión geodésica ya aparece alrededor de una masa no rotante. Pero si la fuente gravitatoria tiene momento angular, la geometría del espacio-tiempo contiene una estructura adicional asociada a esa rotación.

En ese caso aparece el **arrastre de marcos**. La idea no es que exista una rotación absoluta respecto de un fondo fijo, sino que los marcos locales inerciales quedan afectados por la rotación de la fuente. Por tanto, un giroscopio transportado sin torque puede mostrar una precesión adicional cuando su eje se compara con un marco definido respecto de observadores lejanos.

En una aproximación de campo débil, la contribución de Lense--Thirring puede escribirse de forma esquemática como

$$
\boldsymbol{\Omega}_{\mathrm{LT}}
\simeq
\frac{G}{c^2r^3}
\left[
3(\mathbf{J}\cdot\hat{\mathbf{r}})\hat{\mathbf{r}}
-
\mathbf{J}
\right],
$$

donde $\mathbf{J}$ es el momento angular de la fuente.

La diferencia conceptual con la precesión geodésica está en el origen geométrico del efecto. En la precesión geodésica, la masa curva el espacio-tiempo y el eje transportado acumula una diferencia de orientación al compararlo con un marco de referencia. En el arrastre de marcos, la rotación de la fuente modifica también la estructura de los marcos locales.

Ambos efectos, sin embargo, se interpretan dentro del mismo lenguaje. El giroscopio mide cómo evoluciona una dirección espacial local bajo una ley de transporte y cómo esa dirección se compara con un marco elegido.

Por eso estos fenómenos encajan con la cadena conceptual del capítulo:

$$
\text{Transporte del eje}
\longrightarrow
\text{Comparación con un marco}
\longrightarrow
\text{Precesión observable}.
$$

## Lectura holonómica de los giroscopios

El grupo de holonomía es el conjunto de todas las transformaciones obtenidas al transportar alrededor de lazos basados en un punto. La precesión de un giroscopio corresponde a una trayectoria física concreta y a una elección concreta de comparación.

Por tanto, una medida de precesión no es “todo el grupo de holonomía”. Puede interpretarse como un elemento particular, o como una manifestación observable de la estructura de transporte asociada a la conexión.

La relación correcta es más fina:

$$
\text{Curvatura del espacio-tiempo}
\longrightarrow
\text{Dependencia del transporte con el camino}
\longrightarrow
\text{Cambio acumulado de orientación}
\longrightarrow
\text{Precesión observada}.
$$

Los giroscopios proporcionan una lectura física de esa cadena. Su eje de espín actúa como testigo de la geometría. Si después de una trayectoria aparece una diferencia de orientación respecto de un marco de referencia, esa diferencia refleja la estructura del transporte y, en última instancia, la curvatura que lo gobierna.

![Cadena conceptual desde la conexion hasta la precesion observada en giroscopios]({{ '/assets/images/posts/holonomy_all/cadena-conceptual-giroscopio.png' | relative_url }})

## Cierre de la serie

La holonomía permite entender cómo una propiedad local de la geometría puede manifestarse como una transformación acumulada. La conexión define la regla de comparación. El transporte paralelo aplica esa regla a lo largo de curvas. La curvatura mide el defecto local del transporte. La holonomía organiza las transformaciones que aparecen al cerrar lazos.

En relatividad general, esa estructura se vuelve físicamente interpretable porque los espacios tangentes contienen los marcos locales de los observadores. Las tetradas permiten describir cómo un observador separa tiempo y espacio. El transporte de Fermi--Walker define cuándo un marco llevado por un observador no rota localmente. Los giroscopios, finalmente, muestran cómo una dirección espacial puede ser transportada de manera física por el espacio-tiempo.

> La holonomía conecta la geometría local de la curvatura con transformaciones globales de vectores y marcos. En relatividad general, esas transformaciones pueden aparecer como precesiones observables de giroscopios.

Por eso la holonomía una forma de expresar que la geometría del espacio-tiempo no solo curva trayectorias: También afecta a la manera en que las direcciones, los marcos y las orientaciones se comparan a lo largo del movimiento.

## Bibliografía del capítulo

1. Garay, L. J. *General Relativity*. Lecture notes. Universidad Complutense de Madrid.

2. Carroll, S. M. *Lecture Notes on General Relativity*. arXiv:gr-qc/9712019.

3. Wald, R. M. *General Relativity*. University of Chicago Press, 1984.

4. Misner, C. W.; Thorne, K. S.; Wheeler, J. A. *Gravitation*. W. H. Freeman, 1973.

5. Janssen, B. *Relatividad General*. Universidad de Granada.

6. Everitt, C. W. F. et al. “Gravity Probe B: Final Results of a Space Experiment to Test General Relativity”. *Physical Review Letters*, 106, 221101, 2011.

7. Schiff, L. I. “Possible New Experimental Test of General Relativity Theory”. *Physical Review Letters*, 4, 215–217, 1960.
