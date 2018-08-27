---
layout: post
date: "2018-06-27 00:00:00"
title: XDAG Presentation
image: /assets/images/posts/xdag-presentation-img/XDAG-15.jpg
---


One of our core developers Frozen has made an informative presentation about XDAG. It was made for his in person presentations, but we want to share it with everyone online as well. Check it out! Big thanks to Frozen for all his work on XDAG.

Topics: Introduction, Block, Transaction, PoW, Algorithm, Transport, Security, Future plans.  
[Download PDF]({{ 'assets/images/posts/xdag-presentation.pdf' | absolute_url }})

{% for image in site.static_files %}
  {% if image.path contains 'images/posts/xdag-presentation-img' %}
  <div markdown="0">
    <hr>
    <img class="img-responsive lazyload" data-src="{{ image.path | absolute_url }}" alt="XDAG presentation"/>
  </div>
  {% endif %}
{% endfor %}
