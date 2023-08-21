-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 22, 2023 at 12:08 AM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `mineral`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `id` int(11) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `tlp` varchar(255) NOT NULL,
  `jk` varchar(255) NOT NULL,
  `alamat` longtext NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` longtext NOT NULL,
  `photo` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pelanggan`
--

CREATE TABLE `pelanggan` (
  `id` int(11) NOT NULL,
  `nama_p` varchar(255) NOT NULL,
  `tlp` varchar(255) NOT NULL,
  `jk_p` varchar(255) NOT NULL,
  `alamat_p` longtext NOT NULL,
  `lat_p` varchar(50) NOT NULL,
  `lng_p` varchar(50) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` longtext NOT NULL,
  `photo` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pelanggan`
--

INSERT INTO `pelanggan` (`id`, `nama_p`, `tlp`, `jk_p`, `alamat_p`, `lat_p`, `lng_p`, `email`, `password`, `photo`, `created_at`, `updated_at`) VALUES
(1, 'dwi', '0891234', 'Laki-laki', 'Jl. Aip. Ks. Tubun No.133, Sampit, Kec. Delta Pawan, Kabupaten Ketapang, Kalimantan Barat 78811, Indonesia', '-1.8304860', '109.9752544', 'dwi@gmail.com', '$2y$10$qC53ouh.yp0LhXB7M0RPtuX.VGnpzuSsPUQeXfBZbCZT78XbCTOXa', 'app/pelanggan/1687201746-7iGcX.jpg', '2023-06-19 12:09:06', '2023-06-19 12:09:06'),
(2, 'aan', '089877654', 'Laki-laki', 'Jl. M.T. Haryono No.12, Tengah, Kec. Delta Pawan, Kabupaten Ketapang, Kalimantan Barat 78811, Indonesia', '-1.8380023', '109.9776721', 'aan1@gmail.com', '$2y$10$7wuSDmi0NIH/Zd7fzTdpTunciqvzzqTCEpX9dM4CxFZ5ZX4cyI.Xm', 'app/pelanggan/1687285638-ik6kz.jpg', '2023-06-20 11:27:18', '2023-06-20 11:27:18');

-- --------------------------------------------------------

--
-- Table structure for table `produk`
--

CREATE TABLE `produk` (
  `id` char(36) NOT NULL,
  `nama_produk` varchar(255) DEFAULT NULL,
  `stock_produk` varchar(255) DEFAULT NULL,
  `photo_produk` varchar(255) DEFAULT NULL,
  `deskripsi_produk` longtext DEFAULT NULL,
  `harga_produk` double NOT NULL,
  `kategori_produk` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `produk`
--

INSERT INTO `produk` (`id`, `nama_produk`, `stock_produk`, `photo_produk`, `deskripsi_produk`, `harga_produk`, `kategori_produk`, `created_at`, `updated_at`) VALUES
('9965685b-76c9-465b-8731-9cd299975b05', 'GALON', '10', 'app/produk/1686608215-Fi4C0.jpg', '<p>asjhfkjasfkjahskjfhakjsfa</p>', 6500, '-', '2023-06-12 15:16:55', '2023-06-12 15:26:01'),
('99656991-bf13-4da5-8d6d-6ce2d58ae8ac', 'BOTOL', '10', 'app/produk/1686608419-osRpM.png', 'SDASDASDASD', 6500, 'BESAR', '2023-06-12 15:20:19', '2023-06-12 15:20:19'),
('996569eb-277f-4799-87bf-d31cbf56c1a0', 'BOTOL', '5', 'app/produk/1686608477-4dcQN.png', 'zASCACASC', 3000, 'SEDANG', '2023-06-12 15:21:17', '2023-06-12 15:21:17'),
('99656a04-6a20-4ddd-bd66-9fedb2351d86', 'BOTOL', '10', 'app/produk/1686608494-4ninn.png', 'asdasdasdasd', 2000, 'KECIL', '2023-06-12 15:21:34', '2023-06-12 15:21:34'),
('99656a4e-8256-48c0-92c8-dbeef1158291', 'GELAS', '10', 'app/produk/1686608542-HhlUZ.png', 'asgdagsjadhsdasd', 1500, '-', '2023-06-12 15:22:22', '2023-06-12 15:22:22');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `id` int(11) NOT NULL,
  `id_produk` longtext NOT NULL,
  `kategori_produk` varchar(50) NOT NULL,
  `id_pelanggan` int(11) NOT NULL,
  `tanggal_t` date NOT NULL,
  `jam_t` time NOT NULL,
  `total_t` double NOT NULL,
  `jumlah` int(11) NOT NULL,
  `alamat_antar` longtext NOT NULL,
  `lat_antar` varchar(50) NOT NULL,
  `lng_antar` varchar(50) NOT NULL,
  `status` varchar(50) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`id`, `id_produk`, `kategori_produk`, `id_pelanggan`, `tanggal_t`, `jam_t`, `total_t`, `jumlah`, `alamat_antar`, `lat_antar`, `lng_antar`, `status`, `created_at`, `updated_at`) VALUES
(1, '99656991-bf13-4da5-8d6d-6ce2d58ae8ac', 'SEDANG', 1, '2023-06-14', '12:12:00', 15000, 5, 'Jalan Tanpa Nama, Mulia Baru, Kec. Delta Pawan, Kabupaten Ketapang, Kalimantan Barat 78813, Indonesia', '-1.8226469', '110.0188553', 'Diproses', '2023-06-19 14:37:10', '2023-06-19 14:37:10');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `pelanggan`
--
ALTER TABLE `pelanggan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `produk`
--
ALTER TABLE `produk`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pelanggan`
--
ALTER TABLE `pelanggan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
