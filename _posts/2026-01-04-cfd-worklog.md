---
layout: post
title: "CFD Worklog: tools and workflow"
date: 2026-01-04
tags: [cfd, mesh, python, su2]
published: false
---

This is a worklog-style entry (NASA-ish).

## What I’m tracking
- Meshing scripts
- Running SU2
- Post-processing

```python
import numpy as np

x = np.linspace(0, 1, 5)
print(x)
