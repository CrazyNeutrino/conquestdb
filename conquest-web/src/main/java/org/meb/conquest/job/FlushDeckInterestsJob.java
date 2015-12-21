package org.meb.conquest.job;

import javax.inject.Inject;

import org.apache.deltaspike.scheduler.api.Scheduled;
import org.meb.conquest.service.api.DeckInterestService;
import org.quartz.Job;
import org.quartz.JobExecutionContext;
import org.quartz.JobExecutionException;

@Scheduled(cronExpression = "0 * * * * ?")
public class FlushDeckInterestsJob implements Job {

	@Inject
	private DeckInterestService deckInterestService;

	@Override
	public void execute(JobExecutionContext arg0) throws JobExecutionException {
		deckInterestService.flushDeckInterests();
	}
}
