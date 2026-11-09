# Turnos con la tía

Página sencilla para ver quién va al hospital cada día y en qué horas.

## Desplegar en Vercel (gratis, unos 5 minutos)

1. Sube esta carpeta a un repositorio nuevo de GitHub (puede ser privado).
2. En https://vercel.com → **Add New → Project** → importa ese repositorio → **Deploy**.
3. En el proyecto de Vercel: **Storage → Create Database → Upstash (Redis)** → plan gratis → conéctalo al proyecto.
   Esto crea solo las variables `KV_REST_API_URL` y `KV_REST_API_TOKEN`.
4. **Deployments → ⋯ → Redeploy** para que coja las variables.
5. Comparte el enlace `https://<tu-proyecto>.vercel.app`.

Cualquiera con el enlace puede ver y apuntarse (no hay contraseña).
