package com.kewel.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

import java.util.Arrays;

@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable();
        http.authorizeRequests()
                .anyRequest().permitAll();
        http.cors(c -> {
            CorsConfigurationSource cs = r -> {
                CorsConfiguration cc = new CorsConfiguration();
                cc.setAllowedOrigins(Arrays.asList("*"));
                cc.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));
                cc.setAllowedHeaders(Arrays.asList("Origin", "Access-Control-Allow-Origin",
                        "Content-Type", "Accept", "Authorization", "Origin, Accept",
                        "X-Requested-With", "Access-Control-Request-Method", "Access-Control-Request-Headers"));
                cc.setExposedHeaders(Arrays.asList("Origin", "Content-Type", "Accept", "Authorization",
                        "Access-Control-Allow-Origin", "Access-Control-Allow-Origin",
                        "Access-Control-Allow-Credentials"));
                return cc;
            };

            c.configurationSource(cs);
        });
    }
}
