package com.kewel.exception;

public class EmployeNotFoundException extends RuntimeException {
    public EmployeNotFoundException(String s) {
        super(s);
    }
}
