@extends('layouts.app')
@section('title', 'DASHBOARD')
@section('content')


	<div class="row">
		<div class="col-12">
			<div>
				<h4 class="header-title mb-3">DASHBOARD</h4>
			</div>
		</div>
	</div>
	<!-- end row -->

	<div class="row">
		<div class="col-12">
			<div>
				<div class="card-box widget-inline">
					<div class="row">
						<div class="col-xl-3 col-sm-6 widget-inline-box">
							<div class="text-center p-3">
								<h2 class="mt-2"><i class="text-primary mdi mdi-access-point-network mr-2"></i> <b>8954</b></h2>
								<p class="text-muted mb-0">Total</p>
							</div>
						</div>

						<div class="col-xl-3 col-sm-6 widget-inline-box">
							<div class="text-center p-3">
								<h2 class="mt-2"><i class="text-teal mdi mdi-airplay mr-2"></i> <b>7841</b></h2>
								<p class="text-muted mb-0">Total</p>
							</div>
						</div>

						<div class="col-xl-3 col-sm-6 widget-inline-box">
							<div class="text-center p-3">
								<h2 class="mt-2"><i class="text-info mdi mdi-black-mesa mr-2"></i> <b>6521</b></h2>
								<p class="text-muted mb-0">Total users</p>
							</div>
						</div>

						<div class="col-xl-3 col-sm-6">
							<div class="text-center p-3">
								<h2 class="mt-2"><i class="text-danger mdi mdi-cellphone-link mr-2"></i> <b>325</b></h2>
								<p class="text-muted mb-0">Total</p>
							</div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
	<!--end row -->



@endsection