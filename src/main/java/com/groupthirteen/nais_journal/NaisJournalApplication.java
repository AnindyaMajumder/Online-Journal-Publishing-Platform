package com.groupthirteen.nais_journal;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
public class NaisJournalApplication{

	public static void main(String[] args) {
		SpringApplication.run(NaisJournalApplication.class, args);
	}

}
