---
title: "Revised Guide: Oh My Zsh + Powerlevel10k"
description: "Customizing Your Terminal: Oh My Zsh + Powerlevel10k"
pubDate: "2026-02-09"
heroImage: "../../assets/p10kterminal.jpg"
lang: "en"
---

## Revised Guide: Oh My Zsh + Powerlevel10k

This guide provides a streamlined workflow for transforming your terminal into a high-performance environment using **Zsh**, **Oh My Zsh**, and the **Powerlevel10k** theme.

---

### 1. Install Zsh

Install the Zsh shell. It maintains high compatibility with Bash while offering superior auto-completion and plugin management.

```bash
sudo apt update && sudo apt install zsh -y

```

### 2. Set Zsh as the Default Shell

Change your system's default shell from Bash to Zsh to ensure it launches automatically upon terminal startup.

```bash
chsh -s $(which zsh)

```

### 3. Initialize the Zsh Environment

Replace the current shell process with a new Zsh instance to apply the change immediately.

```bash
exec zsh

```

### 4. Install Oh My Zsh

Deploy the Oh My Zsh framework to simplify configuration management for plugins and themes.

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

```

### 5. Install Required Fonts

Powerlevel10k relies on specific glyphs (icons) found in Nerd Fonts. **Install the following font on your host machine** and set it as your terminal's default font to avoid broken icons.

- [MesloLGS NF Regular](https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf)

### 6. Clone the Powerlevel10k Repository

Download the theme into the Oh My Zsh custom themes directory.

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"

```

### 7. Configure `.zshrc`

Open your configuration file and update the `ZSH_THEME` variable.

```bash
# Open file
vi ~/.zshrc

# Locate and update this line:
ZSH_THEME="powerlevel10k/powerlevel10k"

```

### 8. Apply Changes

Source the `.zshrc` file to load the new theme configuration without closing your session.

```bash
source ~/.zshrc

```

### 9. Launch the Configuration Wizard

Restart the shell to trigger the Powerlevel10k setup process.

```bash
exec zsh

```

### 10. Final Customization

The configuration wizard will now guide you through visual preferences (e.g., Rainbow, Lean, or Classic). Follow the prompts to finalize your prompt style.
