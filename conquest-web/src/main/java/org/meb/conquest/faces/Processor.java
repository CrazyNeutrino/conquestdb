package org.meb.conquest.faces;

public interface Processor<S, T> {

	T process(S source);
}
