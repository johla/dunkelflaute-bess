# Kom i gang

## Installer og kjør lokalt

```bash
python -m venv .venv
source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
jupyter lab notebooks/dunkelflaute_batteri_lab.ipynb
```

Notebooken fungerer også uten `ipywidgets`, men da mister du glidebryterne.


## Kjør i GitHub Codespaces

GitHub Codespaces er den enkleste måten å kjøre denne laben uten å installere Python, Jupyter eller VS Code lokalt. Tenk på det som **VS Code i nettleseren**, koblet direkte til GitHub-repoet.

### For helt nye brukere

1. Logg inn på GitHub.
2. Åpne repoet.
3. Klikk **Code**-knappen.
4. Velg fanen **Codespaces**.
5. Klikk **Create codespace on main**.
6. Vent til VS Code åpner seg i nettleseren.
7. Åpne `notebooks/dunkelflaute_batteri_lab.ipynb`.
8. Klikk **Run All** eller kjør én celle av gangen.

Når notebooken spør om kernel, velg Python-miljøet som Codespaces foreslår. Hvis du får spørsmål om å installere anbefalte utvidelser, svar ja.

### Hva er "web VS Code"?

Det som åpner seg er Visual Studio Code, men i nettleseren. Filene ligger i en liten Linux-maskin i skyen. Terminalen nederst er derfor ikke PC-en din, men Codespaces-miljøet. Det betyr at kommandoer som dette kjøres i GitHub sitt miljø:

```bash
pip install -r requirements.txt
jupyter lab
```

Denne repoen inneholder en `.devcontainer/devcontainer.json` som gjør oppsettet mer automatisk. Når Codespaces starter, installeres Python-avhengighetene fra `requirements.txt`.

### Nyttige nybegynner-tips

- **Explorer** til venstre viser filene i repoet.
- **Terminal** åpnes via menyen: `Terminal → New Terminal`.
- **Command Palette** åpnes med `Ctrl+Shift+P` på Windows/Linux eller `Cmd+Shift+P` på Mac.
- Hvis notebooken ikke finner riktig kernel, åpne Command Palette og søk etter `Python: Select Interpreter`.
- Hvis miljøet virker fryst etter en pause, trykk **Start** eller last siden på nytt. Codespaces kan stoppe automatisk etter inaktivitet.
- Når du er ferdig, stopp Codespace fra GitHub-siden for å unngå unødvendig bruk av inkluderte minutter/kost.

### Alternativ: JupyterLab direkte

Codespaces kan også åpnes i JupyterLab, men for nybegynnere er VS Code i nettleseren ofte best fordi du ser både filer, terminal, notebook og Git-status på ett sted.
