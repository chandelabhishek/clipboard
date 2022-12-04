const deterministicPartitionKey = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("should create digest when partitionKey is not passed in the event", () => {
    const hashDigest = deterministicPartitionKey({ rest: "koo" });
    expect(hashDigest).toBe(
      "6333d81d2f846b33f6322eeea4be3ebbcdcf2cf4a51e65db9429591dd30fc07fcc79def9fa181ef10b3ad11b64b600499349328b8fe409b6b61e0e6ced0f22c9"
    );
  });

  it("should return partitionKey when partitionKey is passed in the event", () => {
    const hashDigest = deterministicPartitionKey({
      partitionKey: 20,
      rest: "koo",
    });
    expect(hashDigest).toBe("20");
  });

  it("should return TRIVIAL_PARTITION_KEY when event is not passed", () => {
    const hashDigest = deterministicPartitionKey();
    expect(hashDigest).toBe("0");
  });

  it("should reshash when length of passed partition key is more than 300", () => {
    const hashDigest = deterministicPartitionKey({
      partitionKey:
        "6333d81d2f846b33f6322eeea4be3ebbcdcf2cf4a51e65db9429591dd30fc07fcc79def9fa181ef10b3ad11b64b600499349328b8fe409b6b61e0e6ced0f22c96333d81d2f846b33f6322eeea4be3ebbcdcf2cf4a51e65db9429591dd30fc07fcc79def9fa181ef10b3ad11b64b600499349328b8fe409b6b61e0e6ced0f22c96333d81d2f846b33f6322eeea4be3ebbcdcf2cf4a51e65db9429591dd30fc07fcc79def9fa181ef10b3ad11b64b600499349328b8fe409b6b61e0e6ced0f22c96333d81d2f846b33f6322eeea4be3ebbcdcf2cf4a51e65db9429591dd30fc07fcc79def9fa181ef10b3ad11b64b600499349328b8fe409b6b61e0e6ced0f22c96333d81d2f846b33f6322eeea4be3ebbcdcf2cf4a51e65db9429591dd30fc07fcc79def9fa181ef10b3ad11b64b600499349328b8fe409b6b61e0e6ced0f22c96333d81d2f846b33f6322eeea4be3ebbcdcf2cf4a51e65db9429591dd30fc07fcc79def9fa181ef10b3ad11b64b600499349328b8fe409b6b61e0e6ced0f22c96333d81d2f846b33f6322eeea4be3ebbcdcf2cf4a51e65db9429591dd30fc07fcc79def9fa181ef10b3ad11b64b600499349328b8fe409b6b61e0e6ced0f22c9",
    });
    expect(hashDigest).toBe(
      "8c659645336dfba7f873d6494500a555e7e4dc231e812df6a6ca67fbd58643c9eadfc6f7aaed2abbe554b6a11224b13f47ed7d21df2dbe2c0af5a2ba7bc4467c"
    );
  });
});
