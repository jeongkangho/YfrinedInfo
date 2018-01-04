package com.Notcompany.common;

import java.io.IOException;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 
 * request, response 요청 시 필터를 적용하는 클래스
 * @date : 2016. 12. 1. 오후 5:21:40
 * @version : 
 * @author : feely
 */
public class CommonWebFilter implements Filter {
	
	/* (non-Javadoc)
	 * @see javax.servlet.Filter#doFilter(javax.servlet.ServletRequest, javax.servlet.ServletResponse, javax.servlet.FilterChain)
	 */
	public void doFilter(ServletRequest req, ServletResponse rsp, FilterChain fc) throws IOException, ServletException {
		addCommonAttributes(req,rsp);
		fc.doFilter(req, rsp);
	}

	/* (non-Javadoc)
	 * @see javax.servlet.Filter#init(javax.servlet.FilterConfig)
	 */
	public void init(FilterConfig arg0) throws ServletException {
	}
	
	/* (non-Javadoc)
	 * @see javax.servlet.Filter#destroy()
	 */
	public void destroy() {
	}
	
	/**
	 * crxPath와 ie호환성을 적용하는 메소드
	 * @param req ServletRequest
	 * @param rsp ServletResponse
	 */
	public static void addCommonAttributes(ServletRequest req,ServletResponse rsp) {
		HttpServletRequest request = (HttpServletRequest)req;
		
		String context = request.getContextPath();
//		System.out.println("context path:"+context);
		request.setAttribute("ctxPath", context);
		
		//bill add
		HttpServletResponse response = (HttpServletResponse) rsp;
		response.setHeader("X-UA-Compatible", "IE=Edge");
		//bill add END
		// TODO 공통 적용할 Attribute 를 마음껏 넣으세요
	}

}
