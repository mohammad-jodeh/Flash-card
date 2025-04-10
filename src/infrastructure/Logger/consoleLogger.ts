import colors from "./colors.js";

class Logger {
  public static Error(data: any, path: string = ''): void {
    const now = new Date();
    console.log(
      colors.whiteBg + colors.black,
      now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
      colors.redBg,
      'Error',
      colors.reset,
      colors.red,
      `${path && colors.red}`,
      path ? ` occurred in ${path} ` : '',
      colors.reset,
      data,
    );
  }

  public static Warn(data: any, path: string = ''): void {
    const now = new Date();
    console.log(
      colors.whiteBg + colors.black,
      now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
      colors.yellowBg,
      'Warn',
      colors.reset,
      colors.yellow,
      `${path && colors.yellow}`,
      path ? ` related to ${path} ` : '',
      colors.reset,
      data,
    );
  }

  public static Info(data: any, path: string = ''): void {
    const now = new Date();
    console.log(
      colors.whiteBg + colors.black,
      now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
      colors.blueBg,
      'Info',
      colors.reset + colors.blue,
      `${path && colors.blue}`,
      path ? ` related to ${path} ` : '',
      colors.reset,
      data,
    );
  }

  public static Success(data: any, path: string = ''): void {
    const now = new Date();
    console.log(
      colors.whiteBg + colors.black,
      now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
      colors.greenBg,
      'Success',
      colors.reset + colors.green,
      path ? ` related to ${path} ` : '',
      colors.reset,
      data,
      colors.reset,
    );
  }

  public static Debug(data: any, path: string = ''): void {
    const now = new Date();
    console.log(
      colors.whiteBg + colors.black,
      now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds(),
      colors.magentaBg,
      'Debug',
      colors.reset + colors.magenta,
      path ? ` related to ${path} ` : '',
      colors.reset,
      data,
      colors.reset,
    );
  }
}

export default Logger;
