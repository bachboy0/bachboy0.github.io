---
title: 'WSL環境のセットアップ'
description: 'WSL環境のセットアップガイド'
pubDate: '2026-02-09'
heroImage: '../../assets/blog-placeholder-4.jpg'
lang: 'ja'
---

# WSL環境セットアップガイド

## PowerShellからの初期設定

### WSL 2をデフォルトバージョンに設定

将来のすべてのLinuxインストールがデフォルトでWSL 2アーキテクチャを使用するように、以下のコマンドを実行します。

```powershell
wsl --set-default-version 2

```

### 利用可能なディストリビューションの一覧表示

オンラインインストール可能なLinuxディストリビューションのリストを表示するには、以下のコマンドを使用します。

```powershell
wsl --list --online

```

### 特定のディストリビューションのインストール

お好みのディストリビューションをインストールするには、`<Distro>`を前のステップで確認した名前に置き換えてください。

```powershell
wsl.exe --install <Distro>

```

---

## バックアップとエクスポート

### ディストリビューションのエクスポート

環境の完全なバックアップを`.tar`アーカイブとして作成できます。システムの大きな変更を行う前に、これを実施することを強くお勧めします。

```bash
wsl --export <Distro> "$env:USERPROFILE\Desktop\distro_backup.tar"  

```

---

## アンインストールとクリーンアップ

### ディストリビューションの登録解除

特定の環境が不要になった場合は、登録を解除できます。

> **注意:** この操作は元に戻すことができず、そのディストリビューションに関連するすべてのファイルとデータを完全に削除します。

```bash
wsl --unregister <Distro>

```
