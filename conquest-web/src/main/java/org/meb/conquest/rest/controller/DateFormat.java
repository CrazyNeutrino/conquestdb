package org.meb.conquest.rest.controller;

import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;

import org.jboss.resteasy.annotations.StringParameterUnmarshallerBinder;

@Retention(RetentionPolicy.RUNTIME)
@StringParameterUnmarshallerBinder(DateParser.class)
public @interface DateFormat {
	
	String value();
}