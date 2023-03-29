import {
  processHomePageRecord,
  processMenuRecord,
  processTeamRecord,
  processProfessionalRecord
} from "../database";

describe("data-processor", () => {
  describe("database", () => {
    describe("processHomePageRecord", () => {
      it("should retrun an object from record", () => {
        expect(processHomePageRecord([], ["key", "value"])).toStrictEqual({
          key: "value"
        });
      });
    });

    describe("processMenuRecord", () => {
      it("should transform records to object", () => {
        expect(
          processMenuRecord(["k1", "k2", "k3"], ["v1", "v2", "v3"])
        ).toStrictEqual({
          k1: "v1",
          k2: "v2",
          k3: "v3"
        });
      });
    });

    describe("processTeamRecord", () => {
      it("should transform records to object", () => {
        expect(
          processTeamRecord(["k1", "k2", "k3"], ["v1", "v2", "v3"])
        ).toStrictEqual({
          k1: "v1",
          k2: "v2",
          k3: "v3"
        });
      });
    });

    describe("processProfessionalRecord", () => {
      it("should transform records to object", () => {
        expect(
          processProfessionalRecord(
            ["k1", "k2", "k3", "cities", "c1", "c2", "services", "s1", "s2"],
            [
              "v1",
              "v2",
              "v3",
              "TRUE",
              "TRUE",
              "TRUE",
              "TRUE",
              "TRUE",
              "TRUE",
              "TRUE"
            ]
          )
        ).toStrictEqual({
          k1: "v1",
          k2: "v2",
          k3: "v3",
          cities: ["c1", "c2"],
          services: ["s1", "s2"]
        });
      });
    });

    it("should ignore FALSE cities", () => {
      expect(
        processProfessionalRecord(
          ["k1", "k2", "k3", "cities", "c1", "c2", "services", "s1", "s2"],
          [
            "v1",
            "v2",
            "v3",
            "cities",
            "TRUE",
            "FALSE",
            "services",
            "TRUE",
            "TRUE"
          ]
        )
      ).toStrictEqual({
        k1: "v1",
        k2: "v2",
        k3: "v3",
        cities: ["c1"],
        services: ["s1", "s2"]
      });
    });

    it("should ignore FALSE services", () => {
      expect(
        processProfessionalRecord(
          ["k1", "k2", "k3", "cities", "c1", "c2", "services", "s1", "s2"],
          [
            "v1",
            "v2",
            "v3",
            "cities",
            "TRUE",
            "TRUE",
            "services",
            "FALSE",
            "TRUE",
            "TRUE"
          ]
        )
      ).toStrictEqual({
        k1: "v1",
        k2: "v2",
        k3: "v3",
        cities: ["c1", "c2"],
        services: ["s2"]
      });
    });
  });
});
