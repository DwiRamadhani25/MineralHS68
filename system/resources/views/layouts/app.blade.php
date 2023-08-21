<!DOCTYPE html>
<html lang="en">


<!-- Mirrored from coderthemes.com/simple/layouts/vertical/pages-blank.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 07 Jun 2023 14:49:04 GMT -->

<head>
    <meta charset="utf-8" />
    <title>@yield('title')</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta content="Responsive bootstrap 4 admin template" name="description" />
    <meta content="Coderthemes" name="author" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!-- App favicon -->
    <link rel="shortcut icon" href="assets/images/favicon.ico">
    <!-- App css -->
    <link href="{{ url('public') }}/assets/css/bootstrap.min.css" rel="stylesheet" type="text/css" id="bootstrap-stylesheet" />
    <link href="{{ url('public') }}/assets/css/icons.min.css" rel="stylesheet" type="text/css" />
    <link href="{{ url('public') }}/assets/css/app.min.css" rel="stylesheet" type="text/css" id="app-stylesheet" />
    <style>
        .tox-statusbar{
            display: none !important;
        }
    </style>
</head>

<body>

    <!-- Begin page -->
    <div id="wrapper">


        <!-- Topbar Start -->
        @include('layouts.header')
        <!-- end Topbar -->
        <!-- ========== Left Sidebar Start ========== -->
        @include('layouts.sidebar')
        <!-- Left Sidebar End -->

        <!-- ============================================================== -->
        <!-- Start Page Content here -->
        <!-- ============================================================== -->

        <div class="content-page">
            <div class="content">

                <!-- Start container-fluid -->
                <div class="container-fluid">
                    @foreach (['success', 'danger', 'warning', 'info'] as $status)
                        @if (session($status))
                            <div class="alert alert-{{ $status }} alert-dismissible fade show " role="alert">
                                <div style="display: flex;align-items:center;justify-content:space-between">
                                <b>{{ session($status) }}</b>
                                <button type="button" class="btn btn-link" data-dismiss="alert" aria-label="Close">x</button>
                                </div>
                            </div>
                        @endif
                    @endforeach
                    <!-- start  -->
                    @yield('content')
                    <!-- end -->

                </div>
                <!-- end container-fluid -->



                <!-- Footer Start -->
                
                @include('layouts.footer')
                <!-- end Footer -->

            </div>
            <!-- end content -->

        </div>
        <!-- END content-page -->

    </div>
    <!-- END wrapper -->



    <!-- Right bar overlay-->
    <div class="rightbar-overlay"></div>



    <!-- Vendor js -->
    <script src="{{ url('public') }}/assets/js/vendor.min.js"></script>

    <!-- App js -->
    <script src="{{ url('public') }}/assets/js/app.min.js"></script>
    <script src="https://cdn.tiny.cloud/1/sfjj3rtv9hnng5h6we3xnb7f1rn9j7mbxgahwl8whcfv6xq0/tinymce/6/tinymce.min.js" referrerpolicy="origin"></script>
    <script>
        tinymce.init({
          selector: 'textarea#editor',
          plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss',
          toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
          tinycomments_mode: 'embedded',
          tinycomments_author: 'Author name',
          mergetags_list: [
            { value: 'First.Name', title: 'First Name' },
            { value: 'Email', title: 'Email' },
          ]
        });
      </script>
        
</body>


<!-- Mirrored from coderthemes.com/simple/layouts/vertical/pages-blank.html by HTTrack Website Copier/3.x [XR&CO'2014], Wed, 07 Jun 2023 14:49:04 GMT -->

</html>
