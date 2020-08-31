---
layout: projects/entry.njk
title: Craft CMS Polls
version: 1.1.0
icon: chart-icon.svg
color: "#ea4354"
excerpt: A fully featured polls plugin for Craft CMS. Including translatable questions and options, custom fields for answer options, anonymous voting, etc.
sidebar:
  github:
    text: View on Github
    url: https://github.com/luwes/craft-polls
tags:
  - projects
  - craft cms
  - polls
  - surveys
---

A fully featured polls plugin for [Craft CMS](https://craftcms.com/). Including translatable questions and options, custom fields for answer options, anonymous voting or login required, a bar graph in the answers admin section, other option for free text input.

<div class="projectNote">
    Please read the <a href="https://github.com/luwes/craft-polls/blob/master/LICENSE.md">license</a> before using this plugin on any website.
</div>

### Requirements
- Craft 2.4+
- PHP 5.4+

### Install
1. Download and unzip Polls plugin zip file.
2. Drop polls plugin folder in craft/plugins.
3. Go to Admin / Settings / Plugins and click install.

### Update
1. Download and unzip Polls plugin zip file.
2. Replace craft/plugins/polls folder by the one that you have downloaded.

### Usage
To add a basic poll form to your website insert this code in your template.

{% raw %}
``` twig
{{ craft.polls.form({
    pollResponse: pollResponse|default(null)
}) }}
```
{% endraw %}

You can also write your own code by copying the contents of `polls/templates/forms/basic.html` in your own template and tweaking as you see fit.
