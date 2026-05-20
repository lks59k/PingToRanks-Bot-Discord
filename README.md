# PingToRanksBOT

Un bot Discord français simple et efficace de type **"Ping to Rank"**.

Si un membre a un tag spécifique dans son pseudo et ping le bot dans un salon précis, il reçoit automatiquement un rôle.

---

## ✨ Fonctionnalités

- Attribution automatique du rôle en pingant le bot
- Vérification du tag dans le pseudo (insensible à la casse)
- Suppression automatique du rôle si le tag est retiré
- Système de cooldown anti-spam
- Logs des attributions et suppressions de rôle
- Redémarrage automatique en cas d'erreur

---

## 📋 Configuration

Modifie les constantes dans `index.js` :

| Constante            | Description                                      |
|----------------------|--------------------------------------------------|
| `BOTTOKEN`           | Token de ton bot Discord                         |
| `BOTID`              | ID du bot                                        |
| `GUILDID`            | ID de ton serveur                                |
| `PINGTORANKCHANEL`   | Salon où les membres doivent ping le bot         |
| `ROLESTOGIVE`        | Rôle à donner                                    |
| `TAGS`               | Tag requis dans le pseudo                        |
| `LOGSCHANEL`         | Salon de logs (optionnel)                        |

---

## 🚀 Installation

1. Clone le repository :
   ```bash
   git clone https://github.com/lks59k/PingToRanks-Bot-Discord.git
   ```

2. Installe les dépendances :
   ```bash
   npm install
   ```

3. Configure le `index.js` avec tes IDs et token.

4. Lance le bot :
   ```bash
   npm start
   ```

---

## 🛠️ Technologies

- **Discord.js** v14
- Node.js

---

## 📌 Auteur

Créé par **lks59k**

---

## Licence
MIT License

---
## 💖 Donations
Clique sur un bouton pour soutenir le projet 👇
<p align="center">
<a href="https://www.blockchain.com/explorer?search=bc1q5d08s8fwe4k4sercz570rxzesg6gstc37dn58e">
  <img src="https://img.shields.io/badge/Donate-Bitcoin-orange?style=for-the-badge&logo=bitcoin" />
</a>
<a href="https://blockchair.com/litecoin/address/LPQ6tqrGTvPtKs5guQ3qSCG2rtW1ix7u5Z">
  <img src="https://img.shields.io/badge/Donate-Litecoin-blue?style=for-the-badge&logo=litecoin" />
</a>
</p>
