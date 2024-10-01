# Étape de construction
FROM node:20.16.0-alpine as build

WORKDIR /app

# Copie des fichiers de configuration
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm ci

# Installation spécifique d'Axios
RUN npm install axios --save

# Copie du reste des fichiers du projet
COPY . .

# Construction de l'application (si nécessaire)
RUN npm run build

# Étape de développement
FROM node:20.16.0-alpine as development

WORKDIR /app

# Copie des fichiers et dépendances de l'étape de construction
COPY --from=build /app ./

# Installation des dépendances de développement si nécessaire
RUN npm install

# Exposition du port 5173 (port par défaut de Vite)
EXPOSE 5173

# Commande pour démarrer le serveur de développement
CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]