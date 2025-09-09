<?php
// Get current page for active navigation
$current_page = basename($_SERVER['PHP_SELF']);
?>
<!-- hearder part  -->
<header class="header_part">
    <div class="sub_header section_bg">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-xl-6 col-lg-7 col-md-8">
                    <div class="header_contact_info">
                        <a href="mailto:info.abivruthi@gmail.com" target="_blank"><i
                                class="fas fa-envelope"></i>info.abivruthi@gmail.com</a>
                        <a href="tel:+919047676525"><i class="fas fa-phone"></i>+919047676525</a>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-7 col-md-4">
                    <div class="header_social_icon">
                        <p class="mb-0 me-2">Chat with us :</p>
                        <a href="https://wa.me/+919047676525"><i class="fab fa-whatsapp"></i></a>
                        <a href="https://www.instagram.com/abivruthi_kindergarten/"><i class="fab fa-instagram"></i></a>
                        <a href="https://www.facebook.com/abivruthikindergarten"><i class="fab fa-facebook-f"></i></a>
                        <a href="https://www.youtube.com/@abivruthikindergarten"><i class="fab fa-youtube"></i></a>
                        <a href="https://x.com/abivruthikinder"><i class="fab fa-twitter"></i></a>
                        <a href="https://www.google.com/search?q=abivruthi&oq=abi&gs_lcrp=EgZjaHJvbWUqCAgDEEUYJxg7MgYIABBFGDwyBwgBEC4YgAQyBggCEEUYOTIICAMQRRgnGDsyBwgEEC4YgAQyBwgFEAAYgAQyBggGEEUYPDIGCAcQRRg80gEINzM5OGowajeoAgCwAgA&sourceid=chrome&ie=UTF-8#lrd=0x3bad472bc2572825:0xd5e2a355a35f497e,1,,,,"><i class="fas fa-star"></i></a>

                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="header">
        <div class="container">
            <div class="row align-items-center">
                <div class="col-lg-12">
                    <nav class="navbar navbar-expand-lg navbar-light">
                        <a class="navbar-brand" href="index.php"><img src="img/full/lf3.jpg"
                                srcset="img/full/lf3.jpg" alt="Abivruthi"></a>
                        <button class="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarContent" aria-controls="navbarContent" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse justify-content-end" id="navbarContent">
                            <ul class="navbar-nav">
                                <li class="nav-item">
                                    <a class="nav-link <?php echo ($current_page == 'index.php') ? 'active' : ''; ?>" href="index.php">Home</a>
                                </li>
                                
                                <li class="nav-item">
                                    <a class="nav-link <?php echo ($current_page == 'about.php') ? 'active' : ''; ?>" href="about.php">About Us</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link <?php echo ($current_page == 'admission.php') ? 'active' : ''; ?>" href="admission.php">Admission</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link <?php echo ($current_page == 'our_programs.php') ? 'active' : ''; ?>" href="our_programs.php">Our Programs</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link <?php echo ($current_page == 'gallery.php') ? 'active' : ''; ?>" href="gallery.php">Gallery</a>
                                </li>

                                <li class="nav-item">
                                    <a class="nav-link <?php echo ($current_page == 'contact.php') ? 'active' : ''; ?>" href="contact.php">Contact Us</a>
                                </li>
                            </ul>
                            <a href="contact.php" class="cu_btn btn_1">Get Started</a>
                        </div>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</header>
<!-- header part end --> 