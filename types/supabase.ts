/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

import { ReminderPeriod, TimezoneType } from '../models'

export interface paths {
  "/": {
    get: {
      responses: {
        /** OK */
        200: unknown;
      };
    };
  };
  "/appointment": {
    get: {
      parameters: {
        query: {
          id?: parameters["rowFilter.appointment.id"];
          user_id?: parameters["rowFilter.appointment.user_id"];
          created_at?: parameters["rowFilter.appointment.created_at"];
          name?: parameters["rowFilter.appointment.name"];
          date?: parameters["rowFilter.appointment.date"];
          requestor?: parameters["rowFilter.appointment.requestor"];
          invitee?: parameters["rowFilter.appointment.invitee"];
          invitee_reminder_periods?: parameters["rowFilter.appointment.invitee_reminder_periods"];
          requestor_reminder_periods?: parameters["rowFilter.appointment.requestor_reminder_periods"];
          /** Filtering Columns */
          select?: parameters["select"];
          /** Ordering */
          order?: parameters["order"];
          /** Limiting and Pagination */
          offset?: parameters["offset"];
          /** Limiting and Pagination */
          limit?: parameters["limit"];
        };
        header: {
          /** Limiting and Pagination */
          Range?: parameters["range"];
          /** Limiting and Pagination */
          "Range-Unit"?: parameters["rangeUnit"];
          /** Preference */
          Prefer?: parameters["preferCount"];
        };
      };
      responses: {
        /** OK */
        200: {
          schema: definitions["appointment"][];
        };
        /** Partial Content */
        206: unknown;
      };
    };
    post: {
      parameters: {
        body: {
          /** appointment */
          appointment?: definitions["appointment"];
        };
        query: {
          /** Filtering Columns */
          select?: parameters["select"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** Created */
        201: unknown;
      };
    };
    delete: {
      parameters: {
        query: {
          id?: parameters["rowFilter.appointment.id"];
          user_id?: parameters["rowFilter.appointment.user_id"];
          created_at?: parameters["rowFilter.appointment.created_at"];
          name?: parameters["rowFilter.appointment.name"];
          date?: parameters["rowFilter.appointment.date"];
          requestor?: parameters["rowFilter.appointment.requestor"];
          invitee?: parameters["rowFilter.appointment.invitee"];
          invitee_reminder_periods?: parameters["rowFilter.appointment.invitee_reminder_periods"];
          requestor_reminder_periods?: parameters["rowFilter.appointment.requestor_reminder_periods"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
    patch: {
      parameters: {
        query: {
          id?: parameters["rowFilter.appointment.id"];
          user_id?: parameters["rowFilter.appointment.user_id"];
          created_at?: parameters["rowFilter.appointment.created_at"];
          name?: parameters["rowFilter.appointment.name"];
          date?: parameters["rowFilter.appointment.date"];
          requestor?: parameters["rowFilter.appointment.requestor"];
          invitee?: parameters["rowFilter.appointment.invitee"];
          invitee_reminder_periods?: parameters["rowFilter.appointment.invitee_reminder_periods"];
          requestor_reminder_periods?: parameters["rowFilter.appointment.requestor_reminder_periods"];
        };
        body: {
          /** appointment */
          appointment?: definitions["appointment"];
        };
        header: {
          /** Preference */
          Prefer?: parameters["preferReturn"];
        };
      };
      responses: {
        /** No Content */
        204: never;
      };
    };
  };
}

export interface definitions {
  appointment: {
    /**
     * Format: bigint
     * @description Note:
     * This is a Primary Key.<pk/>
     */
    id?: number;
    /** Format: uuid */
    user_id: string;
    /**
     * Format: timestamp with time zone
     * @default now()
     */
    created_at?: string;
    /** Format: text */
    name: string;
    /** Format: json */
    date: string;
    /** Format: json */
    requestor: string;
    /** Format: json */
    invitee: string;
    /** Format: ARRAY */
    invitee_reminder_periods: ReminderPeriod[];
    /** Format: ARRAY */
    requestor_reminder_periods: ReminderPeriod[];
    /** Format: text */
    timezone: TimezoneType;
  };
}

export interface parameters {
  /**
   * @description Preference
   * @enum {string}
   */
  preferParams: "params=single-object";
  /**
   * @description Preference
   * @enum {string}
   */
  preferReturn: "return=representation" | "return=minimal" | "return=none";
  /**
   * @description Preference
   * @enum {string}
   */
  preferCount: "count=none";
  /** @description Filtering Columns */
  select: string;
  /** @description On Conflict */
  on_conflict: string;
  /** @description Ordering */
  order: string;
  /** @description Limiting and Pagination */
  range: string;
  /**
   * @description Limiting and Pagination
   * @default items
   */
  rangeUnit: string;
  /** @description Limiting and Pagination */
  offset: string;
  /** @description Limiting and Pagination */
  limit: string;
  /** @description appointment */
  "body.appointment": definitions["appointment"];
  /** Format: bigint */
  "rowFilter.appointment.id": string;
  /** Format: uuid */
  "rowFilter.appointment.user_id": string;
  /** Format: timestamp with time zone */
  "rowFilter.appointment.created_at": string;
  /** Format: text */
  "rowFilter.appointment.name": string;
  /** Format: json */
  "rowFilter.appointment.date": string;
  /** Format: json */
  "rowFilter.appointment.requestor": string;
  /** Format: json */
  "rowFilter.appointment.invitee": string;
  /** Format: ARRAY */
  "rowFilter.appointment.invitee_reminder_periods": string;
  /** Format: ARRAY */
  "rowFilter.appointment.requestor_reminder_periods": string;
}

export interface operations {}

export interface external {}
