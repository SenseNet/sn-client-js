/**
 * @module Repository
 * @preferred
 * 
 * @description This module contains models for Sense/Net ECM's GetVersionInfo custom action
 */ /** */


/**
 * The type of a specific package
 */
export enum PackageType{
    /**
     * Can contain small repeatable activities that do not perform significant changes but can be important because of business or technical reasons. A good example is performing an undo checkout on multiple content. Executing a package of this level does not change the application's or the product's version number but the execution is logged and registered
     */
    Tool,
    
    /**
     * Contains small modifications (e.g. a couple of new content to import or a bugfix in a dll). Usually patches form a chain where every package assumes the existence of all the previous ones but it is not mandatory. It is possible to control this behavior, see version control below.
     */
    Patch,
    
    /**
     *  An application's first package must be an 'install' package. This is the package that injects a new application into the system. Only Application packages can be set on this level. An install level package must contain a new application identifier that is unknown to the system. Packages on this level can be executed only once.
     */
    Install
}

/**
 * Represents a .NET Assembly in the Version Info
 */
export class Assembly{
    public CodeBase: string;
    public IsDynamic: boolean;
    public Name: string;
    public Version: string;
}

/**
 * Represents a Sense/NET ECM Component in the Version Info
 */
export class Component{
    public ComponentId: string;
    public Version: string;
    public AcceptableVersion: string;
    public Description: string;
}

/**
 * Represents a Sense/NET ECM Package in the Version Info
 */
export class Package {
    public ComponentId: string;
    public ComponentVersion: string;
    public Description: string;
    public ExecutionDate: Date;
    public ExecutionError: Object;
    public Id: number;
    public Manifest: Object;
    public PackageType: PackageType;
    public ReleaseDate: Date;
}

/**
 * Represents a model for the Sense/NET ECM's GetVersionInfo custom action's response
 */
export class VersionInfo {
    public Assemblies: {
        Dynamic: Assembly[],
        GAC: Assembly[],
        Other: Assembly[],
        Plugins: Assembly[],
        SenseNet: Assembly[],
    };
    public Components: Component[];
    public DatabaseAvailable: boolean;
    public InstalledPackages: Package[];
}