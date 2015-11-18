package org.meb.conquest.web.faces;

import java.io.Serializable;

import javax.annotation.PostConstruct;
import javax.faces.application.FacesMessage;
import javax.faces.context.FacesContext;
import javax.faces.view.ViewScoped;
import javax.inject.Inject;

@ViewScoped
public class Messages implements Serializable {

	@Inject
	private LocaleCtrl localeCtrl;

	private static final long serialVersionUID = 762408763096054646L;

	private ResourceBundleUtil resourceBundleUtil;

	@PostConstruct
	public void initialize() {
		resourceBundleUtil = new ResourceBundleUtil("m", localeCtrl.getLocale());
	}

	public void addGlobalInfo(String key) {
		addGlobal(key, FacesMessage.SEVERITY_INFO);
	}

	public void addGlobalWarn(String key) {
		addGlobal(key, FacesMessage.SEVERITY_WARN);
	}

	public void addGlobalError(String key) {
		addGlobal(key, FacesMessage.SEVERITY_ERROR);
	}

	public void addError(String clientId, String key) {
		add(clientId, key, FacesMessage.SEVERITY_ERROR);
	}

	public void addGlobal(String key, FacesMessage.Severity severity) {
		add(null, key, severity);
	}

	public void add(String clientId, String key, FacesMessage.Severity severity) {
		FacesMessage message = new FacesMessage(severity, getResourceBundleUtil().getString(key), null);
		FacesContext.getCurrentInstance().addMessage(clientId, message);
	}

	private ResourceBundleUtil getResourceBundleUtil() {
		if (resourceBundleUtil == null) {
			synchronized (Messages.class) {
				if (resourceBundleUtil == null) {
					resourceBundleUtil = new ResourceBundleUtil("m");
				}
			}
		}
		return resourceBundleUtil;
	}
}
