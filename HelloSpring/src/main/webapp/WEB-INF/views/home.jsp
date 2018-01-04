<%@ page pageEncoding="UTF-8" contentType="text/html; charset=UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib uri="http://www.springframework.org/tags" prefix="spr"%>
<%@ page session="false"%>
<html>
<head>
<meta charset="utf-8">
<title>Home</title>

<link rel="stylesheet" type="text/css" href="${ctxPath}/css/style.css"/>
<script src="${ctxPath}/js/jquery.js"></script>

</head>
<body>
<form>
	<h1>Hello world!</h1>

	<P>The time on the server is ${serverTime}.</P>
	<div class="bbs">
		<table>
			<tr>
				<th>제목</th>
				<td>즐거운 화요일</td>
			</tr>
			<tr>
				<th>날씨</th>
				<td>맑음</td>
			</tr>
			<tr>
				<th>점심</th>
				<td>회사식당 </td>
			</tr>
		</table>
	</div>
</form>

</body>
</html>
