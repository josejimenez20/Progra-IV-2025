-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 29-04-2025 a las 18:07:00
-- Versión del servidor: 8.3.0
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `db_sistema_academico`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `alumnos`
--

CREATE TABLE `alumnos` (
  `idAlumno` int NOT NULL,
  `codigo` char(15) COLLATE utf8mb4_general_ci NOT NULL,
  `nombre` char(75) COLLATE utf8mb4_general_ci NOT NULL,
  `direccion` char(150) COLLATE utf8mb4_general_ci NOT NULL,
  `telefono` char(25) COLLATE utf8mb4_general_ci NOT NULL,
  `email` char(75) COLLATE utf8mb4_general_ci NOT NULL,
  `codigo_transaccion` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `hash` char(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `alumnos`
--

INSERT INTO `alumnos` (`idAlumno`, `codigo`, `nombre`, `direccion`, `telefono`, `email`, `codigo_transaccion`, `hash`) VALUES
(4, 'USIS018804', 'Luis Enrique Hernandez', 'Usulutan', '2626-4545', 'luis@ugb.edu.sv', '993f0858-6e76-4438-93b5-91e1da099a2c', '63a1ccc44fc69e5b3ae0e816b2c9787d611f7bfdca08cdf2fe522334eab18926'),
(16, 'USSS013023', 'GersonK', 'El salvador', '76556777', 'gerson@gmail.com', 'a31c2b92-bfcf-425b-90b9-ff3b8be8b3be', 'f22d3ec0eb431daa7419e85c75bb8b5321a923badc8f731a724ee15cf9d697e4');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `bitacora`
--

CREATE TABLE `bitacora` (
  `idBitacora` int NOT NULL,
  `idDocumento` char(36) NOT NULL,
  `hash` char(100) NOT NULL,
  `data` longtext NOT NULL,
  `fecha_hora` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Volcado de datos para la tabla `bitacora`
--

INSERT INTO `bitacora` (`idBitacora`, `idDocumento`, `hash`, `data`, `fecha_hora`) VALUES
(10, '830bcf36-3607-4553-bcd0-c0c422d76617', 'e0250b0e58664226ff440078c189d55335ddf0a23f459c2a0e027114b18069c6', '{\"codigo\":\"USSS015566\",\"nombre\":\"Fernando Palomo Guandique\",\"direccion\":\"SS\",\"telefono\":\"8809-7777\",\"email\":\"fernando@gmail.com\",\"codigo_transaccion\":\"830bcf36-3607-4553-bcd0-c0c422d76617\",\"hash\":\"e0250b0e58664226ff440078c189d55335ddf0a23f459c2a0e027114b18069c6\"}', '2025-03-30 18:33:39'),
(11, 'a17de3df-bde3-4d0d-b0b3-69a86da113bc', '6ac3d2754e81e7ea30e4ff18b4f021a93e3c6b6ba6a2b8d0227a82bea9db8a4a', '{\"codigo\":\"USSS030325\",\"nombre\":\"Carlos Salvador\",\"direccion\":\"El salvador\",\"telefono\":\"8976-0990\",\"email\":\"carlos@gmail.com\",\"codigo_transaccion\":\"a17de3df-bde3-4d0d-b0b3-69a86da113bc\",\"hash\":\"6ac3d2754e81e7ea30e4ff18b4f021a93e3c6b6ba6a2b8d0227a82bea9db8a4a\"}', '2025-03-30 19:03:10'),
(12, '2498abd7-6680-499b-9fc5-cd632b21b17f', 'ea91b56681db9bc85330a70124b8550ec5648cbeca4e3cf429b372753c69dbea', '{\"nombre\":\"Jesus Carrasco\",\"password\":\"hola\",\"codigo_transaccion\":\"2498abd7-6680-499b-9fc5-cd632b21b17f\",\"hash\":\"ea91b56681db9bc85330a70124b8550ec5648cbeca4e3cf429b372753c69dbea\"}', '2025-03-30 22:53:10');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `materias`
--

CREATE TABLE `materias` (
  `idMateria` int NOT NULL,
  `codigo` char(5) COLLATE utf8mb4_general_ci NOT NULL,
  `nombre` char(100) COLLATE utf8mb4_general_ci NOT NULL,
  `uv` tinyint NOT NULL,
  `codigo_transaccion` char(36) COLLATE utf8mb4_general_ci NOT NULL,
  `hash` char(100) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `idUsuario` int NOT NULL,
  `nombre` char(75) NOT NULL,
  `password` char(50) NOT NULL,
  `codigo_transaccion` char(36) NOT NULL,
  `hash` char(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`idUsuario`, `nombre`, `password`, `codigo_transaccion`, `hash`) VALUES
(1, 'Jesus Carrasco', 'hola', '2498abd7-6680-499b-9fc5-cd632b21b17f', 'ea91b56681db9bc85330a70124b8550ec5648cbeca4e3cf429b372753c69dbea'),
(2, 'Kendo', 'frijolin', '82d6ab58-c73a-4833-bfa4-749c087cc966', '82984404381efb1647e4362a6d5c36a5134a118f3c902a047552ef638013247f');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  ADD PRIMARY KEY (`idAlumno`),
  ADD UNIQUE KEY `codigo_transaccion` (`codigo_transaccion`) USING BTREE;

--
-- Indices de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  ADD PRIMARY KEY (`idBitacora`);

--
-- Indices de la tabla `materias`
--
ALTER TABLE `materias`
  ADD PRIMARY KEY (`idMateria`),
  ADD KEY `codigo_transaccion` (`codigo_transaccion`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `alumnos`
--
ALTER TABLE `alumnos`
  MODIFY `idAlumno` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `bitacora`
--
ALTER TABLE `bitacora`
  MODIFY `idBitacora` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `idUsuario` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
