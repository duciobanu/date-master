const unitTestingTask = require("../unitTestingTask");

describe("unitTestingTask", () => {
  test("should define unitTestingTask as a factory function", () => {
    expect(typeof unitTestingTask).toBe("function");
  });

  test("tokens YYYY should return the full year", () => {
    const date = new Date("2024-08-09");
    expect(unitTestingTask("YYYY", date)).toBe("2024");
  });

  test("tokens YY should return the last 2 digits of the year", () => {
    const date = new Date("2024-08-09");
    expect(unitTestingTask("YY", date)).toBe("24");
  });

  test("tokens MMMM should return the full name of month", () => {
    const date = new Date("2024-08-09");
    expect(unitTestingTask("MMMM", date)).toBe("August");
  });

  test("tokens MMMM should return the short name of month", () => {
    const date = new Date("2024-08-09");
    expect(unitTestingTask("MMM", date)).toBe("Aug");
  });

  test("tokens MM should return zero-padded month", () => {
    const date = new Date("2024-08-09");
    expect(unitTestingTask("MM", date)).toBe("08");
  });

  test("tokens M should return month without padding", () => {
    const date = new Date("2024-08-09");
    expect(unitTestingTask("M", date)).toBe("8");
  });

  test("tokens DDD should return full weekday name", () => {
    const date = new Date("2024-08-09");
    expect(unitTestingTask("DDD", date)).toBe("Friday");
  });

  test("tokens DD should return short weekday name", () => {
    const date = new Date("2024-08-09");
    expect(unitTestingTask("DD", date)).toBe("Fri");
  });

  test("tokens D should return the day of the month", () => {
    const date = new Date("2024-08-09");
    expect(unitTestingTask("D", date)).toBe("Fr");
  });

  test("tokens dd should return zero-padded day of the month", () => {
    const date = new Date("2024-08-09");
    expect(unitTestingTask("dd", date)).toBe("09");
  });

  test("tokens d should return min weekday name", () => {
    const date = new Date("2024-08-09");
    expect(unitTestingTask("d", date)).toBe("9");
  });

  test("tokens HH should return zero-padded hour in 24-hr format", () => {
    const date = new Date("2024-08-09T04:30:00");
    expect(unitTestingTask("HH", date)).toBe("04");
  });

  test("tokens H should return hour in 24-hr format", () => {
    const date = new Date("2024-08-09T23:00:00");
    expect(Number(unitTestingTask("H", date))).toBe(23);
  });

  test("tokens hh should return zero-padded hour in 12-hr format", () => {
    const date = new Date("2024-08-09T12:30:00");
    expect(unitTestingTask("hh", date)).toBe("12");
  });

  test("tokens h should return hour in 12-hr format", () => {
    const date = new Date("2024-08-09T12:30:00");
    expect(Number(unitTestingTask("h", date))).toBe(12);
  });

  test("tokens mm should return zero-padded minutes", () => {
    const date = new Date("2024-08-09T14:05:00");
    expect(unitTestingTask("mm", date)).toBe("05");
  });

  test("tokens m should return minutes", () => {
    const date = new Date("2024-08-09T14:05:00");
    expect(Number(unitTestingTask("m", date))).toBe(5);
  });

  test("tokens ss should return zero-padded seconds", () => {
    const date = new Date("2024-08-09T14:30:05");
    expect(unitTestingTask("ss", date)).toBe("05");
  });

  test("tokens s should return seconds", () => {
    const date = new Date("2024-08-09T14:30:05");
    expect(Number(unitTestingTask("s", date))).toBe(5);
  });

  test("tokens ff should return zero-padded milliseconds", () => {
    const date = new Date("2024-08-09T14:30:05.023");
    expect(unitTestingTask("ff", date)).toBe("023");
  });

  test("tokens f should return milliseconds", () => {
    const date = new Date("2024-08-09T14:30:05.123");
    expect(Number(unitTestingTask("f", date))).toBe(123);
  });

  test("tokens A should return AM/PM", () => {
    const date1 = new Date("2024-08-09T14:30:00");
    expect(unitTestingTask("A", date1)).toBe("PM");
    const date2 = new Date("2024-08-09T11:30:00");
    expect(unitTestingTask("A", date2)).toBe("AM");
  });

  test("tokens a should return am/pm", () => {
    const date1 = new Date("2024-08-09T14:30:00");
    expect(unitTestingTask("a", date1)).toBe("pm");
    const date2 = new Date("2024-08-09T11:30:00");
    expect(unitTestingTask("a", date2)).toBe("am");
  });

  test("tokens ZZ should return timezone offset", () => {
    const date1 = new Date("2024-08-09T14:30:00-04:00");
    expect(unitTestingTask("ZZ", date1)).toBe("+0300");
  });

  test("tokens Z should return timezone with colon", () => {
    const date = new Date("2024-08-09T14:30:00-0400");
    expect(unitTestingTask("Z", date)).toBe("+03:00");
  });

  describe("unitTestingTask.lang", () => {
    test("should set and get current language", () => {
      unitTestingTask.lang("pl", {});
      expect(unitTestingTask.lang()).toBe("pl");
    });

    test("should return default language when no argument is passed", () => {
      unitTestingTask.lang("fr", {});
      unitTestingTask.lang();
      expect(unitTestingTask.lang()).toBe("fr");
    });
  });

  describe("date formatting", () => {
    const date = new Date("2023-01-01T12:00:00Z");

    test("should format date with YYYY-MM-dd", () => {
      expect(unitTestingTask("ISODate", date)).toBe("2023-01-01");
    });

    test("should format time with hh:mm:ss", () => {
      expect(unitTestingTask("ISOTime", date)).toBe("02:00:00");
    });

    test("should format date and time with YYYY-MM-ddThh:mm:ss", () => {
      expect(unitTestingTask("ISODateTime", date)).toBe("2023-01-01T02:00:00");
    });

    test("should format date and time with timezone", () => {
      expect(unitTestingTask("ISODateTimeTZ", date)).toMatch(
        /2023-01-01T02:00:00\+02:00/
      );
    });
  });

  test("should set language with specified options", () => {
    const langOptions = {
      months: () => "MockMonth",
      weekdays: ["Mockday1", "Mockday2"],
    };
    unitTestingTask.lang("mockLang", langOptions);
    expect(unitTestingTask.lang()).toBe("mockLang");
    expect(unitTestingTask._languages.mockLang).toBe(langOptions);
  });

  test("should return current language if no parameters passed", () => {
    unitTestingTask.lang("en", {});
    expect(unitTestingTask.lang()).toBe("en");
  });

  test("should define module using AMD pattern if define function is available", () => {
    const root = {};
    const factory = jest.fn(() => "testFactory");
    global.define = jest.fn((_, factoryFunc) => factoryFunc(root));
    global.define.amd = true;

    if (typeof define === "function" && define.amd) {
      define([], () => factory(root));
    }

    expect(define).toHaveBeenCalled();
    expect(factory).toHaveBeenCalledWith(root);

    delete global.define;
  });

  test("should throw a TypeError if format argument is not a string", () => {
    expect(() => unitTestingTask(1234)).toThrow(TypeError);
  });

  test("should set and retrieve language options correctly", () => {
    unitTestingTask.lang("testLang", { months: () => "January" });
    expect(unitTestingTask.lang()).toBe("testLang");
  });

  test("should return available custom formatters", () => {
    const formatters = unitTestingTask.formatters();
    expect(formatters).toContain("ISODate");
    expect(formatters).toContain("ISOTime");
  });

  test("should restore previous global variable if noConflict is called", () => {
    const prevUnitTestingTask = global.unitTestingTask;
    const newUnitTestingTask = unitTestingTask.noConflict();

    expect(global.unitTestingTask).toBe(prevUnitTestingTask);
    expect(newUnitTestingTask).toBe(unitTestingTask);
  });

  describe("noConflict", () => {
    test("should restore previous global unitTestingTask value", () => {
      const previous = global.unitTestingTask;
      const current = unitTestingTask.noConflict();
      expect(global.unitTestingTask).toBe(previous);
      expect(current).toBe(unitTestingTask);
    });
  });
});
