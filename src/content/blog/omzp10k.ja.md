---
title: "Revised Guide: Oh My Zsh + Powerlevel10k"
description: "Customizing Your Terminal: Oh My Zsh + Powerlevel10k"
pubDate: "2026-03-03"
heroImage: "../../assets/p10kterminal.jpg"
lang: "ja"
---

## 概要：Oh My Zsh + Powerlevel10k 設定ガイド

作業ステータスをひと目で把握しやすくするため、**Zsh**、**Oh My Zsh**、および **Powerlevel10k** テーマを使用して、ターミナルを高機能な環境へと構築する手順をまとめました。

---

### 1. Zsh のインストール

Zsh シェルをインストールします。Zsh は Bash との高い互換性を維持しながら、優れた補完機能とプラグイン管理機能を備えています。この補完機能だけでコマンド入力ごとに数秒の時間を短縮できるため、非常に重宝しています。

```bash
sudo apt update && sudo apt install zsh -y

```

### 2. デフォルトシェルを Zsh に変更

システムのデフォルトシェルを Bash から Zsh に変更し、ターミナル起動時に自動で実行されるように設定します。

```bash
chsh -s $(which zsh)

```

### 3. Zsh 環境の初期化

現在のシェルプロセスを新しい Zsh インスタンスに置き換え、変更を即座に適用します。

```bash
exec zsh

```

### 4. Oh My Zsh のインストール

プラグインやテーマの設定を簡素化するフレームワーク「Oh My Zsh」をインストールします。

```bash
sh -c "$(curl -fsSL [https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh](https://raw.githubusercontent.com/ohmyzsh/ohmyzsh/master/tools/install.sh))"

```

### 5. 必須フォントのインストール

Powerlevel10k は特定のアイコン（グリフ）を表示するために Nerd Fonts を必要とします。アイコンの文字化けを防ぐために、**ホスト PC に以下のフォントをインストール**し、ターミナルのデフォルトフォントとして設定してください。これを行わないと、以降のステップで表示が崩れてしまいます。

- [MesloLGS NF Regular](https://github.com/romkatv/powerlevel10k-media/raw/master/MesloLGS%20NF%20Regular.ttf)

### 6. Powerlevel10k リポジトリのクローン

Oh My Zsh のカスタムテーマディレクトリにテーマファイルをダウンロードします。

```bash
git clone --depth=1 [https://github.com/romkatv/powerlevel10k.git](https://github.com/romkatv/powerlevel10k.git) "${ZSH_CUSTOM:-$HOME/.oh-my-zsh/custom}/themes/powerlevel10k"

```

### 7. `.zshrc` の設定

設定ファイルを開き、`ZSH_THEME` 変数を更新します。

```bash
# ファイルを開く
vi ~/.zshrc

# 以下の行を探して修正します：
ZSH_THEME="powerlevel10k/powerlevel10k"

```

### 8. 変更の適用

セッションを終了せずに新しいテーマ設定を読み込むため、`.zshrc` ファイルを再読み込み（source）します。

```bash
source ~/.zshrc

```

### 9. 設定ウィザードの実行

シェルを再起動して、Powerlevel10k の設定プロセスを開始します。

```bash
exec zsh

```

### 10. カスタマイズの完了

設定ウィザードの案内に従って、好みのスタイル（Rainbow、Lean、Classic など）を選択してください。画面の指示に従ってプロンプトのデザインを確定させれば完了です。
