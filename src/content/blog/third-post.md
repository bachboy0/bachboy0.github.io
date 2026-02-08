---
title: 'Oh My Zsh + Powerlevel10k'
description: 'Customizing Your Terminal: Oh My Zsh + Powerlevel10k'
pubDate: 'Jul 22 2022'
heroImage: '../../assets/blog-placeholder-2.jpg'
---

# Customizing Your Terminal: Oh My Zsh + Powerlevel10k

This guide outlines the process for setting up a productive and visually appealing terminal environment using **zsh**, **Oh My Zsh**, and the **Powerlevel10k** theme.

## 1. Install Zsh

First, you need to install the Zsh shell itself. Zsh is highly compatible with Bash but offers much better auto-completion and plugin support.

```bash
sudo apt install zsh

```

## 2. Change Default Shell to Zsh

Once installed, switch your default shell from Bash to Zsh so it opens automatically every time you start your terminal.

```bash
chsh -s $(which zsh)

```

## 3. Restart Zsh

Apply the change immediately by replacing the current shell process with a new Zsh instance.

```bash
exec zsh

```

## 4. Install Oh My Zsh

Oh My Zsh is a framework that makes managing your Zsh configuration (plugins, themes, etc.) much easier. Use the official install script:

```bash
sh -c "$(curl -fsSL https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh)"

```

## 5. Install Recommended Fonts (For Local Machine)

Powerlevel10k uses special icons (glyphs) that require a Nerd Font to display correctly. **You must install this on your host machine (Windows/Mac)** and set it as your terminal font.

* [MesloLGS NF Regular](https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf)

## 6. Install Powerlevel10k Theme

Next, clone the Powerlevel10k repository into your Oh My Zsh custom themes folder. This is one of the fastest and most flexible themes available.

```bash
git clone --depth=1 https://github.com/romkatv/powerlevel10k.git "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"

```

## 7. Restart Zsh Again

Restart the shell one more time to let Oh My Zsh recognize the newly downloaded theme.

```bash
exec zsh

```

## 8. Done!

The Powerlevel10k configuration wizard should start automatically. Simply follow the on-screen prompts to customize your prompt style (e.g., Rainbow, Lean, or Classic).