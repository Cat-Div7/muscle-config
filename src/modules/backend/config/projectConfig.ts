export type Framework = "express";
export type Language = "ts" | "js";
export type Database = "mongodb" | "none";
export type ORM = "mongoose" | "none";
export type Auth = "jwt" | "none";
export type Architecture = "layered";

export interface Extras {
    swagger?: boolean;
    validation?: boolean;
    logger?: boolean;
}

export interface ProjectConfig {
    projectName: string;
    targetDir: string;

    framework: Framework;
    language: Language;

    database: Database;
    orm: ORM;

    auth: Auth;
    architecture: Architecture;

    extras: Extras;

    usePrettier: boolean;
    useGit: boolean;
}
