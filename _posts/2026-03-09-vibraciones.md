---
layout: post
title: "vibraciones"
date: 2026-03-09
tags: [physics, space-time, simetry]
series_index: 1
published: false
---

# De masas y muelles a geometría: una mirada profunda a las vibraciones

Los sistemas de vibraciones aparecen constantemente en ingeniería y física. Un conjunto de masas unidas por muelles, una estructura mecánica sometida a oscilaciones o incluso una molécula cuyos átomos vibran alrededor de su posición de equilibrio son ejemplos de sistemas cuya dinámica se describe mediante ecuaciones de vibración.

En su forma más general, estas ecuaciones se escriben como

$$
M \ddot{q} + C \dot{q} + K q = f(t),
$$

donde:

- \(M\) es la matriz de masas  
- \(C\) la matriz de amortiguamiento  
- \(K\) la matriz de rigidez  

El vector \(q\) representa las coordenadas del sistema.

A primera vista estas ecuaciones parecen una herramienta puramente técnica. Se utilizan para calcular frecuencias naturales, estudiar resonancias o diseñar estructuras resistentes a vibraciones. Sin embargo, si se examinan con más atención, revelan una estructura matemática profunda basada en formas cuadráticas, operadores lineales y geometría.

---

# Energía y formas cuadráticas

El punto de partida natural para estudiar vibraciones es la energía.

En ausencia de amortiguamiento y fuerzas externas, la energía total del sistema es

$$
E = T + V.
$$

La energía cinética puede escribirse como

$$
T = \frac12 \dot{q}^T M \dot{q}
$$

y la energía potencial elástica como

$$
V = \frac12 q^T K q.
$$

Ambas expresiones son **formas cuadráticas**.

Esto significa que las matrices \(M\) y \(K\) contienen toda la información sobre cómo cambian las energías cuando el sistema se mueve o se deforma.

Las formas cuadráticas aparecen constantemente en matemáticas porque describen geometrías. Por ejemplo, la ecuación de una elipse o de un elipsoide puede escribirse mediante una forma cuadrática.

Por tanto, las energías de un sistema vibratorio ya contienen implícitamente una estructura geométrica.

---

# Las ecuaciones de movimiento

A partir de la energía construimos el lagrangiano

$$
L = T - V.
$$

Aplicando las ecuaciones de Lagrange se obtiene

$$
M\ddot{q} + Kq = 0.
$$

Este sistema describe vibraciones libres sin amortiguamiento.

Para resolverlo se buscan soluciones armónicas

$$
q(t) = \phi e^{i\omega t}.
$$

Al sustituir esta expresión en las ecuaciones se obtiene

$$
(K - \omega^2 M)\phi = 0.
$$

Esto conduce al **problema de autovalores generalizado**

$$
K\phi = \omega^2 M\phi.
$$

Los valores propios \( \omega^2 \) son los cuadrados de las frecuencias naturales del sistema y los vectores propios \( \phi \) describen los modos de vibración.

---

# El operador dinámico \(M^{-1}K\)

Si multiplicamos las ecuaciones de movimiento por \(M^{-1}\) obtenemos

$$
\ddot{q} + M^{-1}K q = 0.
$$

Esto muestra que la dinámica del sistema está gobernada por el operador

$$
A = M^{-1}K.
$$

Los autovalores de este operador son

$$
\lambda_i = \omega_i^2
$$

y sus autovectores son los modos de vibración.

Desde el punto de vista matemático, el problema de vibraciones es un problema espectral para el operador \(M^{-1}K\).

---

# Transformaciones de coordenadas

Si realizamos un cambio de coordenadas

$$
q = T z
$$

las ecuaciones del sistema cambian.

Las matrices se transforman como

$$
M' = T^T M T
$$

$$
C' = T^T C T
$$

$$
K' = T^T K T
$$

Esto ocurre porque las matrices \(M\), \(C\) y \(K\) representan **formas bilineales**.

Por ejemplo, la energía cinética puede escribirse como

$$
T = \frac12 \dot{q}^T M \dot{q}.
$$

Al cambiar de coordenadas aparece naturalmente la transformación \(T^T M T\).

---

# El truco para construir matrices de masa

En vibraciones existe un método práctico muy utilizado.

La idea es escribir primero la energía cinética del sistema

$$
T = \frac12 \sum m_i v_i^2.
$$

Luego se expresan las velocidades \(v_i\) en función de las coordenadas generalizadas.

Al expandir la energía cinética se identifican directamente los términos

$$
T = \frac12 \dot{q}^T M \dot{q}.
$$

De esta forma se puede construir la matriz de masas directamente a partir de las velocidades de cada masa.

---

# Interpretación geométrica

La energía cinética

$$
T = \frac12 \dot{q}^T M \dot{q}
$$

tiene exactamente la forma de una métrica riemanniana

$$
ds^2 = dq^T M dq.
$$

Por tanto, la matriz de masas define una **métrica en el espacio de configuraciones**.

Si el sistema tiene \(n\) grados de libertad, el espacio de configuraciones es un espacio \(n\)-dimensional.

La matriz \(M\) determina cómo se miden las distancias y velocidades en ese espacio.

---

# El potencial como superficie cuadrática

La energía potencial

$$
V = \frac12 q^T K q
$$

define una superficie cuadrática.

Las superficies de energía constante

$$
q^T K q = \text{constante}
$$

son **elipsoides** en el espacio de configuraciones.

En dos dimensiones estas superficies son elipses.

Estas superficies describen cómo crece la energía cuando el sistema se aleja del equilibrio.

---

# Modos normales como direcciones principales

Si la matriz \(K\) tiene términos cruzados, las superficies de potencial estarán rotadas respecto a los ejes de coordenadas.

Los modos normales corresponden a las **direcciones principales de estas superficies cuadráticas**.

Si introducimos las coordenadas modales

$$
q = \Phi \eta
$$

las energías se transforman en

$$
T = \frac12 \sum m_i \dot{\eta}_i^2
$$

$$
V = \frac12 \sum k_i \eta_i^2.
$$

Cada coordenada modal describe un oscilador independiente.

---

# Ortogonalidad modal

Los modos propios satisfacen

$$
\phi_i^T M \phi_j = 0
$$

para \(i \ne j\).

También se cumple

$$
\phi_i^T K \phi_j = 0.
$$

Esto significa que los modos propios son ortogonales respecto a las formas cuadráticas definidas por \(M\) y \(K\).

---

# El cociente de Rayleigh

Otra forma de entender los modos normales es mediante el cociente de Rayleigh

$$
R(q) = \frac{q^T K q}{q^T M q}.
$$

Este cociente mide la relación entre energía potencial y energía cinética.

Los valores extremos de \(R(q)\) corresponden a

$$
R(q) = \omega_i^2.
$$

Por tanto, las frecuencias naturales aparecen como extremos de este cociente.

---

# Interpretación tensorial

Si interpretamos \(M\) como una métrica \(g_{ij}\), entonces

$$
A^i{}_j = M^{ik} K_{kj}.
$$

Esto es equivalente a **elevar un índice con la métrica**, exactamente igual que en geometría diferencial o relatividad.

---

# Vibraciones como geometría

Un sistema vibratorio puede interpretarse geométricamente como:

- una métrica \(M\) que define la geometría del espacio de configuraciones
- una superficie de potencial definida por \(K\)

Los modos normales son las direcciones donde estas dos estructuras se alinean.

---

# El principio de Maupertuis–Jacobi

Existe una interpretación aún más profunda.

Si la energía total se conserva

$$
E = T + V
$$

entonces el movimiento del sistema puede reinterpretarse como geodésicas de la **métrica de Jacobi**

$$
ds_J^2 = 2(E - V(q)) dq^T M dq.
$$

En esta métrica, las trayectorias físicas son geodésicas.

Esto significa que la dinámica clásica puede interpretarse como movimiento libre en un espacio cuya geometría está deformada por el potencial.

---

# Conclusión

La teoría de vibraciones suele presentarse como una herramienta práctica para analizar sistemas mecánicos.

Sin embargo, su estructura matemática revela algo mucho más profundo.

Las matrices de masa y rigidez no son simplemente parámetros mecánicos: representan formas cuadráticas que definen la geometría del espacio de configuraciones y la curvatura del potencial.

Los modos normales aparecen como las direcciones principales de esta geometría.

Así, lo que comienza como un sistema de masas y muelles termina revelándose como un problema de geometría en un espacio abstracto donde la dinámica está gobernada por métricas, operadores lineales y superficies cuadráticas.

En este sentido, la teoría de vibraciones no es únicamente una herramienta de ingeniería. También es una manifestación concreta de una idea fundamental de la física moderna:

> el movimiento puede entenderse, en última instancia, como geometría.