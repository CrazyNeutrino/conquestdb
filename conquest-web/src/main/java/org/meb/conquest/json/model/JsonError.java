package org.meb.conquest.json.model;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JsonError {

	private Long timestamp;
	private String message;

	public JsonError(Long timestamp) {
		this.timestamp = timestamp;
	}
	
	public JsonError(Long timestamp, String message) {
		this.timestamp = timestamp;
		this.message = message;
	}
}
