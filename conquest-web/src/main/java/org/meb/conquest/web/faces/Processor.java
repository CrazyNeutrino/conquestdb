package org.meb.conquest.web.faces;

public interface Processor<S, T> {

	T process(S source);
}
