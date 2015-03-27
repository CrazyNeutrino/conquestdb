package org.meb.conquest.db.model;

public interface ILang<B extends IBase<?>> {

	B getBase();

	void setBase(B base);

	String getLangCode();

	void setLangCode(String langCode);
}
