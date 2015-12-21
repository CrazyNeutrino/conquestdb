package org.meb.conquest.db.query;

import java.util.HashSet;
import java.util.Set;

import lombok.Getter;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@RequiredArgsConstructor
public class Query<T> {

	public enum Mode {
		OR, AND
	}
	
	@NonNull
	private T example;
	private Mode mode = Mode.AND;
	private Sorting sorting = new Sorting();
	private Integer pageNumber;
	private Integer pageSize;
	private Set<String> fetchPaths = new HashSet<>();
	
	public Query(T example, Mode mode) {
		this.example = example;
		this.mode = mode;
	}
	
	public void correctPageNumberAndSize(int maxPageSize) {
		if (pageNumber == null || pageNumber < 1) {
			pageNumber = 1;
		}
		if (pageSize == null || pageSize < 1 || pageSize > maxPageSize) {
			pageSize = maxPageSize;
		}
	}
}
