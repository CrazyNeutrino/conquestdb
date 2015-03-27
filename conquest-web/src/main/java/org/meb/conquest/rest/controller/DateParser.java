package org.meb.conquest.rest.controller;

import java.lang.annotation.Annotation;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.jboss.resteasy.spi.StringParameterUnmarshaller;
import org.jboss.resteasy.util.FindAnnotation;

public class DateParser implements StringParameterUnmarshaller<Date> {

	private SimpleDateFormat fmt;

	public void setAnnotations(Annotation[] annotations) {
		DateFormat format = FindAnnotation.findAnnotation(annotations, DateFormat.class);
		fmt = new SimpleDateFormat(format.value());
	}

	public Date fromString(String str) {
		try {
			return fmt.parse(str);
		} catch (ParseException e) {
			throw new RuntimeException(e);
		}
	}
}
