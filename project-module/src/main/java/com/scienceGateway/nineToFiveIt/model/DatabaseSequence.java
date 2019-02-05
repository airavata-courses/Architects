package com.scienceGateway.nineToFiveIt.model;

import org.springframework.data.annotation.Id;

public class DatabaseSequence {

    @Id
    private String id;

    public DatabaseSequence() {}

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public long getSeq() {
        return seq;
    }

    public void setSeq(long seq) {
        this.seq = seq;
    }

    private long seq;
}
