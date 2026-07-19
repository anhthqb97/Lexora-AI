import { describe, expect, it } from "vitest";
import {
  SPEAKING_TOPICS,
  SPEAKING_SCENARIOS,
  getTopicById,
  getScenarioById,
  listTopics,
  listScenarios,
} from "@/lib/modules/speaking/content";

describe("speaking content map", () => {
  it("lists 10 MVP topics", () => {
    expect(listTopics()).toHaveLength(10);
    expect(SPEAKING_TOPICS[0].id).toBe("T-01");
  });

  it("lists 5 MVP scenarios", () => {
    expect(listScenarios()).toHaveLength(5);
    expect(SPEAKING_SCENARIOS[0].id).toBe("S-01");
  });

  it("finds topic by id", () => {
    const topic = getTopicById("T-06");
    expect(topic?.title).toBe("Hobbies");
    expect(topic?.followUps.length).toBeGreaterThan(0);
  });

  it("finds scenario with question bank", () => {
    const scenario = getScenarioById("S-02");
    expect(scenario?.questionBank).toHaveLength(6);
  });
});
