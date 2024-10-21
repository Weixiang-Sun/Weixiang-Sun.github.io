---
permalink: /
title: ""
excerpt: ""
author_profile: true
redirect_from: 
  - /about/
  - /about.html
---

{% if site.google_scholar_stats_use_cdn %}
{% assign gsDataBaseUrl = "https://cdn.jsdelivr.net/gh/" | append: site.repository | append: "@" %}
{% else %}
{% assign gsDataBaseUrl = "https://raw.githubusercontent.com/" | append: site.repository | append: "/" %}
{% endif %}
{% assign url = gsDataBaseUrl | append: "google-scholar-stats/gs_data_shieldsio.json" %}

<span class='anchor' id='about-me'></span>

Hi, I am a final year undergraduate student majoring in Information and Computational Science in the [College of Science]() at [Northeastern University](http://english.neu.edu.cn), and I am currently interning under the supervision of Prof. [Lichao Sun](https://lichao-sun.github.io/) in the LAIR(Lehigh AI Research) lab at [Lehigh University](https://www2.lehigh.edu/). I also have in-depth cooperation with Prof. [Xiang Li](https://xiangli-shaun.github.io/) at [Massachusetts General Hospital and Harvard Medical School](https://researchers.mgh.harvard.edu/). My research interests include Large models and their applications in biomedical scenarios. My long-term research goal is to make different large models a trusted, efficient and powerful tool in biomedical domain.  I have published some papers with total <a href='https://scholar.google.com/citations?user=zizf0i0AAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>.

> I am seeking potential research collaborations and the position of industry research intern. If you are interested, please [contact me](&#40;mailto:kennysweson@gmail.com&#41;).


<!-- I have published more than 100 papers at the top international AI conferences with total <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'>google scholar citations <strong><span id='total_cit'>260000+</span></strong></a> (You can also use google scholar badge <a href='https://scholar.google.com/citations?user=DhtAFkwAAAAJ'><img src="https://img.shields.io/endpoint?url={{ url | url_encode }}&logo=Google%20Scholar&labelColor=f6f6f6&color=9cf&style=flat&label=citations"></a>). -->


# 🔥 News
- *2023.09*: &nbsp;🎉🎉 Our [TTT-Unet: Enhancing U-Net with Test-Time Training Layers for Biomedical Image Segmentation](https://arxiv.org/abs/2409.11299) is released! 
- *2024.08*: &nbsp;🎉🎉 We release [Biomedical SAM 2: Segment Anything in Biomedical Images and Videos](https://www.arxiv.org/abs/2408.03286). We are still working on it!
- *2024.06*: &nbsp;🎉🎉 We release [**Bora**](https://weixiang-sun.github.io/Bora/), the **world's first** video generation model specifically for the biomedical domain.
- *2024.06*: &nbsp;🎉🎉 Our Medical Unlearnable Example is accepted by [ICML2024 NextGenAISafety](https://icml-nextgenaisafety.github.io/)!
- *2023.05*: &nbsp;🎉🎉 I join the LAIR Lab in Lehigh as an intern student. My advisor is [Lichao Sun](https://lichao-sun.github.io/). 
- *2022.06*: &nbsp;🎉🎉 I'm selected in Northeastern University-North Carolina State University Mathematics Undergraduate International Exchange Program udner the advise of [Kazufumi Ito](https://kito.wordpress.ncsu.edu/).

# 📝 Selected Publications 

See the full publication list at the bottom of the page or via [Google Scholar](https://scholar.google.com/citations?user=zizf0i0AAAAJ).

<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arxiv preprint</div><img src='images/paper/bora.gif' alt="sym" width="60%"></div></div>
<div class='paper-box-text' markdown="1">

[Bora: Biomedical Generalist Video Generation Model](https://arxiv.org/abs/2407.08944)

**Weixiang Sun**<sup>†</sup>, Xiaocao You<sup>†</sup>, Ruizhe zheng<sup>†</sup>, Zhengqing Yuan, Xiang Li, Lifang He, Quanzheng Li, Lichao Sun.

[**Project Page**](https://weixiang-sun.github.io/Bora/) <span class='show_paper_citations' data='zizf0i0AAAAJ:UeHWp8X0CEIC'>Loading ...</span>
[![](https://img.shields.io/github/stars/Weixiang-Sun/Bora)](https://github.com/Weixiang-Sun/Bora)
- **World's first** video generation model specifically for the biomedical domain. 
</div>
</div>


<div class='paper-box'><div class='paper-box-image'><div><div class="badge">arxiv preprint</div><img src='images/paper/SAM2.jpg' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Biomedical sam 2: Segment anything in biomedical images and videos](https://arxiv.org/abs/2408.03286)

Zhiling Yan<sup>†</sup>, **Weixiang Sun**<sup>†</sup>, Rong Zhou<sup>†</sup>, Zhengqing Yuan<sup>†</sup>, Kai Zhang, Yiwei Li, Tianming Liu, Quanzheng Li, Xiang Li, Lifang He, Lichao Sun.

<!-- [**Project Page**](https://weixiang-sun.github.io/Bora/)  -->

<span class='show_paper_citations' data='zizf0i0AAAAJ:UeHWp8X0CEIC'></span>

<!-- [![](https://img.shields.io/github/stars/Weixiang-Sun/Bora)](https://github.com/Weixiang-Sun/Bora) -->
<!-- - **World's first** video generation model specifically for the biomedical domain.  -->
</div>
</div>



<!-- <div class='paper-box'><div class='paper-box-image'><div><div class="badge">CVPR 2016</div><img src='images/500x300.png' alt="sym" width="100%"></div></div>
<div class='paper-box-text' markdown="1">

[Deep Residual Learning for Image Recognition](https://openaccess.thecvf.com/content_cvpr_2016/papers/He_Deep_Residual_Learning_CVPR_2016_paper.pdf)

**Kaiming He**, Xiangyu Zhang, Shaoqing Ren, Jian Sun

[**Project**](https://scholar.google.com/citations?view_op=view_citation&hl=zh-CN&user=DhtAFkwAAAAJ&citation_for_view=DhtAFkwAAAAJ:ALROH1vI_8AC) <strong><span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span></strong>
- Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
</div>
</div>

- [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet](https://github.com), A, B, C, **CVPR 2020** -->




# 🎖 Honors and Awards
- *2021.10* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2021.09* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 

# 📖 Educations
- *2019.06 - 2022.04 (now)*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2021.09 - 2025.07*, Department of Mathematics, College of Science, Northeastern University. 

<!-- # 💬 Invited Talks
- *2021.06*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet. 
- *2021.03*, Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet.  \| [\[video\]](https://github.com/) -->

# 💻 Internships
- *2023.05 - Present*, [Lehigh University](), US.

# Full Publication List
- [Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus ornare aliquet ipsum, ac tempus justo dapibus sit amet](https://github.com), A, B, C, **CVPR 2020**