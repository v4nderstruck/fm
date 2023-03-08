package zensayyy.fm.broker;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Broker {


    @Bean
    public MessagesBroker messagesBroker() {
        return new MessagesBroker();
    }

    
}
