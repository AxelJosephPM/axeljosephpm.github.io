---
layout: post
title: "Curvatura y holonomía: lo local que se acumula"
date: 2026-05-23
tags: [geometry, curvature, holonomy]
series: "Holonomía, transporte y giroscopios"
series_index: 3
published: true
---

La holonomía describe transformaciones finitas producidas por transporte paralelo alrededor de lazos. La curvatura explica de dónde nace localmente ese efecto.

# Curvatura y holonomía: lo local que se acumula

En el capítulo anterior la holonomía apareció como el conjunto de transformaciones que se obtienen al transportar vectores alrededor de lazos cerrados. Esa definición es global en el sentido de que depende de caminos completos. Pero la geometría diferencial suele buscar también una lectura local: un objeto definido punto a punto que explique el primer defecto no trivial del transporte.

Ese objeto es la curvatura de la conexión.

La idea física o geométrica puede decirse de forma bastante directa. Si transportamos un vector alrededor de un lazo muy pequeño, el vector puede regresar ligeramente distinto. El primer término no trivial de esa diferencia está controlado por el tensor de curvatura. Por eso la curvatura puede entenderse como el defecto infinitesimal del transporte paralelo.

La holonomía, en cambio, organiza el efecto acumulado de esos defectos al recorrer lazos cerrados.

## La curvatura como fallo de conmutatividad

Sea $\nabla$ una conexión sobre $TM$. Su tensor de curvatura se define por

$$
R(X,Y)Z
=
\nabla_X\nabla_YZ
-
\nabla_Y\nabla_XZ
-
\nabla_{[X,Y]}Z,
$$

para campos vectoriales $X,Y,Z\in\mathfrak{X}(M)$.

Esta expresión mide el fallo de conmutatividad de las derivadas covariantes. Si derivar primero en la dirección $X$ y después en la dirección $Y$ diera siempre el mismo resultado que hacerlo en el orden contrario, la curvatura asociada a esas dos direcciones sería nula.

El término $\nabla_{[X,Y]}Z$ corrige el hecho de que los propios campos $X$ e $Y$ pueden no conmutar. Sin esa corrección, la definición dependería más de la forma de describir el cálculo que de la geometría intrínseca.

En coordenadas locales adoptaremos la convención

$$
[\nabla_\mu,\nabla_\nu]V^\rho
=
R^\rho{}_{\sigma\mu\nu}V^\sigma.
$$

Con esta convención, las componentes del tensor de curvatura vienen dadas por

$$
R^\rho{}_{\sigma\mu\nu}
=
\partial_\mu\Gamma^\rho_{\nu\sigma}
-
\partial_\nu\Gamma^\rho_{\mu\sigma}
+
\Gamma^\rho_{\mu\lambda}\Gamma^\lambda_{\nu\sigma}
-
\Gamma^\rho_{\nu\lambda}\Gamma^\lambda_{\mu\sigma}.
$$

La fórmula involucra los coeficientes de conexión y sus derivadas. Pero a diferencia de los símbolos $\Gamma^\rho_{\mu\nu}$, que no son tensoriales por sí mismos, la combinación completa sí define un tensor.

La conexión es la regla de comparación. La curvatura es una medida tensorial del fallo local de esa regla cuando intentamos comparar siguiendo direcciones distintas.

![Fallo de conmutatividad al transportar alrededor de un paralelogramo infinitesimal]({{ '/assets/images/posts/holonomy_all/conmutador-derivadas.png' | relative_url }})

## Lazos pequeños y defecto de retorno

Tomemos un punto $p\in M$ y dos direcciones tangentes $u,v\in T_pM$. Estas direcciones generan, de forma infinitesimal, un pequeño paralelogramo alrededor de $p$.

Para hacerlo más preciso, imaginemos que los lados del paralelogramo son

$$
\varepsilon u,
\qquad
\eta v,
$$

donde $\varepsilon$ y $\eta$ son números pequeños. La idea es estudiar qué ocurre cuando transportamos paralelamente un vector $w\in T_pM$ alrededor de ese lazo y volvemos al punto inicial.

> **Nota:**  
> Cuando decimos que algo es de **primer orden**, nos referimos a términos proporcionales a uno solo de los desplazamientos pequeños:
>
> $$
 \varepsilon
 \qquad \text{o} \qquad
 \eta.
 $$
>
> Cuando decimos que algo es de **segundo orden**, nos referimos a términos que contienen productos de dos desplazamientos pequeños:
>
> $$
\varepsilon^2,
 \qquad
 \eta^2,
 \qquad
 \varepsilon\eta.
 $$
>
> En particular, el término $\varepsilon\eta$ representa el área infinitesimal del paralelogramo generado por las dos direcciones.

En un lazo cerrado, los efectos de primer orden asociados a avanzar y retroceder por una misma dirección se cancelan. Si avanzamos en la dirección $u$ y luego deshacemos ese desplazamiento, la contribución proporcional a $\varepsilon$ desaparece. Lo mismo ocurre con la dirección $v$ y los términos proporcionales a $\eta$.

Por tanto, el primer efecto que puede sobrevivir al cerrar el paralelogramo no es lineal en un solo desplazamiento. Debe involucrar a las dos direcciones del lazo. El término relevante es entonces proporcional a

$$
\varepsilon\eta.
$$

Este producto mide el área orientada del pequeño paralelogramo. Por eso esperamos que el defecto de retorno no sea proporcional a la longitud de un lado, sino al área encerrada por el lazo.

La curvatura mide la diferencia entre transportar primero en una dirección y luego en la otra, frente a hacerlo en el orden contrario. Es decir, compara los dos recorridos infinitesimales

$$
u\longrightarrow v
$$

y

$$
v\longrightarrow u.
$$

Esa diferencia está medida por el operador de curvatura

$$
R(u,v)w.
$$

Si los lados del lazo son $\varepsilon u$ y $\eta v$, entonces, por bilinealidad de la curvatura en sus dos primeras entradas,

$$
R(\varepsilon u,\eta v)w
=
\varepsilon\eta R(u,v)w.
$$

La curvatura aporta la transformación infinitesimal que actúa sobre $w$, mientras que el factor $\varepsilon\eta$ aporta el tamaño orientado del lazo.

Por tanto, el defecto de retorno tiene, en primer orden no trivial, la forma:

$$
\Delta w
\sim
\varepsilon\eta R_p(u,v)w.
$$

Como $\varepsilon\eta$ representa el área orientada infinitesimal del paralelogramo, se suele escribir de manera más geométrica como

$$
\Delta w
\sim
R_p(u,v)w\,\operatorname{Area}(u,v).
$$

Aquí $R_p(u,v)$ actúa como un endomorfismo de $T_pM$:

$$
R_p(u,v):T_pM\longrightarrow T_pM,
\qquad
w\longmapsto R_p(u,v)w.
$$

Se debe tener también en cuenta de que no nos importa solo el valor del área si no que también importa el plano orientado del lazo. De forma más precisa, el área orientada se codifica mediante un bivector de área $A^{\mu\nu}$. Para el paralelogramo generado por $\varepsilon u$ y $\eta v$, este bivector tiene la forma

$$
A^{\mu\nu}
=
\varepsilon\eta
\left(
u^\mu v^\nu
-
u^\nu v^\mu
\right).
$$

Entonces el defecto de retorno puede escribirse como

$$
\Delta w^\rho
=
\frac{1}{2}
R^\rho{}_{\sigma\mu\nu}(p)
w^\sigma
A^{\mu\nu}
+
\text{términos de orden superior}.
$$

El factor $1/2$ aparece porque $A^{\mu\nu}$ es antisimétrico y codifica el área orientada en el plano generado por las dos direcciones. El signo concreto depende de la orientación del lazo y de la convención adoptada para el tensor de curvatura.

Si $R=0$ en una región simplemente conexa, entonces el transporte paralelo es localmente independiente del camino dentro de esa región. Los lazos pequeños no producen defecto de retorno. La conexión es plana en esa región.

Esto no implica automáticamente que toda holonomía global sea trivial en cualquier espacio, porque la topología puede introducir efectos globales. Pero sí significa que la fuente local del defecto desaparece.
## De lazos pequeños a holonomía

La sección anterior nos da una primera relación entre curvatura y holonomía. Pero aun no termina de cerrar cual es la relacion que existe entre estos 2 objetos.

La razón es que la curvatura y la holonomía viven en niveles distintos. La curvatura es un objeto local, este se evalúa punto a punto y describe qué ocurre alrededor de lazos infinitesimales. La holonomía, en cambio, se construye con lazos cerrados completos y recoge transformaciones finitas del espacio tangente.

Por tanto, no basta con decir que “la curvatura produce holonomía”. Esa frase contiene la intuición correcta, pero todavía deja varias preguntas abiertas.

Primero: si la curvatura se mide en cada punto de la variedad, ¿cómo combinamos información que vive en espacios tangentes distintos?

Segundo: si la curvatura describe lazos infinitesimales, ¿cómo se relaciona con lazos cerrados de tamaño finito?

Tercero: si la holonomía es un grupo de transformaciones, ¿en qué parte de ese grupo aparece directamente la curvatura?

Estas preguntas señalan la necesidad de introducir un nivel intermedio entre curvatura y grupo de holonomía: el álgebra de holonomía.

## El álgebra de holonomía

El grupo de holonomía en $p$ está formado por transformaciones lineales de $T_pM$ obtenidas mediante transporte paralelo alrededor de lazos cerrados basados en $p$:

$$
\operatorname{Hol}_p(\nabla)\leq GL(T_pM).
$$

Este grupo contiene transformaciones finitas. Sin embargo, la curvatura describe un efecto infinitesimal. Para relacionar ambos objetos, conviene mirar la parte infinitesimal del grupo de holonomía.

La holonomía restringida, denotada por

$$
\operatorname{Hol}^0_p(\nabla),
$$

se obtiene considerando solo los lazos contractibles basados en $p$. Su álgebra de Lie se denota por

$$
\mathfrak{hol}_p(\nabla)
=
\operatorname{Lie}
\left(
\operatorname{Hol}^0_p(\nabla)
\right).
$$

Esta álgebra describe las direcciones infinitesimales de la holonomía cerca de la identidad.

Aquí aparece la conexión conceptual con los lazos pequeños. Un lazo infinitesimal produce una transformación de transporte paralela muy cercana a la identidad:

$$
P_\gamma
=
\operatorname{id}_{T_pM}
+
\text{término infinitesimal}.
$$

Y el primer término no trivial de esa transformación está controlado por la curvatura.

Por eso la curvatura no debe pensarse, directamente, como un elemento del grupo de holonomía. Es más natural pensarla como un generador infinitesimal de holonomía. Es decir, como un objeto que vive en el álgebra de holonomía.

De forma esquemática:

$$
\text{Curvatura}
\longrightarrow
\text{Generadores infinitesimales}
\longrightarrow
\text{Transformaciones finitas de holonomía}.
$$

## El problema del punto base

Todavía queda un detalle importante. La holonomía en $p$ actúa sobre el espacio tangente $T_pM$. Por tanto, su álgebra de Lie está formada por endomorfismos de $T_pM$:

$$
\mathfrak{hol}_p(\nabla)\subseteq \mathfrak{gl}(T_pM).
$$

Pero la curvatura no vive solo en $p$. Si $q\in M$, entonces

$$
R_q(u,v):T_qM\longrightarrow T_qM
$$

es un endomorfismo de $T_qM$, no de $T_pM$.

Esto significa que no podemos mezclar directamente la curvatura evaluada en distintos puntos. Antes hay que llevar toda esa información al mismo espacio tangente.

Si $\alpha$ es una curva que une $p$ con $q$, el transporte paralelo define un isomorfismo

$$
P_\alpha:T_pM\longrightarrow T_qM.
$$

Entonces la curvatura en $q$ puede transportarse de vuelta al punto base mediante conjugación:

$$
P_\alpha^{-1}
\circ
R_q(u,v)
\circ
P_\alpha
:
T_pM
\longrightarrow
T_pM.
$$

Ahora sí tenemos un endomorfismo de $T_pM$, comparable con los elementos del álgebra de holonomía en $p$.

## Teorema de Ambrose--Singer

Con todo esto, el teorema de Ambrose--Singer aparece como la respuesta natural al problema que teníamos pendiente.

Queremos relacionar:

$$
\text{Curvatura local}
$$

con

$$
\text{Holonomía basada en }p.
$$

Pero para hacerlo correctamente hay que resolver las siguientes dificultades:

1. La curvatura vive punto a punto.
2. La holonomía vive en un punto base.
3. La curvatura es infinitesimal, mientras que la holonomía contiene transformaciones finitas.

El teorema de Ambrose--Singer resuelve estas tres dificultades diciendo que el álgebra de holonomía está generada por los operadores de curvatura transportados al punto base.

Esto es:

$$
\mathfrak{hol}_p(\nabla)
=
\left\langle
P_\alpha^{-1}
\circ
R_q(u,v)
\circ
P_\alpha
\right\rangle,
$$

donde $q$ recorre los puntos accesibles desde $p$, $\alpha$ recorre curvas que unen $p$ con $q$, y $u,v\in T_qM$ son direcciones tangentes en $q$.

La notación $\langle\cdot\rangle$ indica que tomamos el álgebra de Lie generada por esos endomorfismos.

Por tanto tenemos que el operador

$$
R_q(u,v)
$$

mide el defecto infinitesimal del transporte paralelo en el punto $q$, para el pequeño plano generado por las direcciones $u$ y $v$. Pero ese operador vive  en $T_qM$, mientras que la holonomía que estamos estudiando está basada en $p$ y actúa sobre $T_pM$.

Por esta razón no basta con tomar la curvatura en $q$ de forma aislada. Para que pueda contribuir al álgebra de holonomía en $p$, primero hay que transportarla al punto base. Si $\alpha$ es una curva que une $p$ con $q$, este transporte se realiza mediante la conjugación

$$
P_\alpha^{-1}
\circ
R_q(u,v)
\circ
P_\alpha
:
T_pM
\longrightarrow
T_pM.
$$

Así, el defecto infinitesimal medido en $q$ se reescribe como un endomorfismo de $T_pM$. Al variar el punto $q$, la curva $\alpha$ y las direcciones $u,v$, se obtiene la familia de operadores que genera el álgebra de holonomía:

$$
\text{Curvatura local}
\longrightarrow
\text{Curvatura transportada al punto base}
\longrightarrow
\mathfrak{hol}_p(\nabla).
$$

La curvatura no es exactamente la holonomía, ni genera directamente todo el grupo de holonomía completo. Lo que genera es el álgebra de la holonomía restringida, una vez que todos los operadores de curvatura han sido transportados al mismo punto base.

La holonomía restringida $\operatorname{Hol}^0_p(\nabla)$ recoge la parte conectada del fenómeno, asociada a lazos contractibles. La holonomía completa $\operatorname{Hol}_p(\nabla)$ puede contener información adicional debida a la topología global de la variedad, especialmente cuando existen lazos no contractibles.

Por tanto, la relación correcta no es simplemente

$$
\text{Curvatura}
\longrightarrow
\text{Holonomía}.
$$

Es más bien

$$
\text{Curvatura local}
\longrightarrow
\text{Curvatura transportada al punto base}
\longrightarrow
\mathfrak{hol}_p(\nabla)
\longrightarrow
\operatorname{Hol}^0_p(\nabla)
\subseteq
\operatorname{Hol}_p(\nabla).
$$

Esta es la razón por la que Ambrose--Singer aparece como el cierre natural de la discusión. Los lazos pequeños muestran que la curvatura controla el defecto infinitesimal del transporte paralelo. El teorema explica cómo todos esos defectos infinitesimales, reunidos en un mismo punto base, generan la parte infinitesimal de la holonomía.

Con esta estructura, la cadena conceptual queda ordenada:

$$
\text{Conexión}
\longrightarrow
\text{Transporte paralelo}
\longrightarrow
\text{Defecto de retorno}
\longrightarrow
\text{Curvatura}
\longrightarrow
\text{Álgebra de holonomía}
\longrightarrow
\text{Holonomía}.
$$

En los capítulos anteriores, la conexión aparecía como la regla que permite comparar vectores. El transporte paralelo aplicaba esa regla a lo largo de curvas. Los lazos cerrados convertían el transporte en una transformación de un espacio tangente sobre sí mismo. Ahora la curvatura explica la fuente local de esas transformaciones, y Ambrose--Singer muestra cómo esa información local se organiza para producir la holonomía restringida.

## Bibliografía del capítulo

1. Garay, L. J. *Lecture Notes on Differential Geometry*. Universidad Complutense de Madrid.

2. Ambrose, W.; Singer, I. M. “A theorem on holonomy”. *Transactions of the American Mathematical Society*, 75(3), 428–443, 1953.

3. Schwachhöfer, L. J. *Holonomy*. Lecture notes.

4. Clarke, A.; Santoro, B. *Holonomy groups in Riemannian geometry*. arXiv:1206.3170.

5. Carroll, S. M. *Lecture Notes on General Relativity*. arXiv:gr-qc/9712019.

6. Wald, R. M. *General Relativity*. University of Chicago Press, 1984.
