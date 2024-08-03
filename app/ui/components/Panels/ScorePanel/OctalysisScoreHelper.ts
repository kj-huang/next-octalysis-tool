enum summary {
  initial = `Your Octalysis`,
  whiteHat = `White Hat`,
  blackHat = `Black Hat`,
  proudOfYou = `Proud of You`,
  weakExperience = `Weak Experience`,
  leftBrain = `Left Brain`,
  rightBrain = `Right Brain`,
  goodMotivation = `Good Motivation`,
  fallingAsleep = `Falling Asleep`,
  anotherDay = `Another Day`,
}

enum feedback {
  initial = `Play with the slides above to set the Core Drives\nSet your project title and subtitles.\nYou can also set the logo for the project.`,
  whiteHat = `Your experience is heavily focused on White Hat Core Drives, which means users feel great and empowered. The drawback is that users do not have a sense of urgency to commit the desired actions. Think about implementing light Black Hat Techniques to add a bit more thrill to the experience.`,
  blackHat = `Your experience is heavily focused on Black Hat Core Drives, which means that it is great at driving user behavior, but users may not feel good and may leave your system in the long run (think of some Zynga products). Heavily consider adding in White Hat Techniques so that users feel great after being compelled to take the desired actions.`,
  proudOfYou = `Your experience is fairly balanced in both White Hat and Black Hat Core Drives. I'm proud of you ;-)`,
  weakExperience = `Your experience is weak on both White Hat and Black Hat Core Drives. Hedging gets you nowhere you know?`,
  leftBrain = `Also, your Left Brain Core Drives are much stronger than Right Brain Ones, which means your experience is much more extrinsic in nature. This may affect long-run engagement because once the goal is removed or lessened, users lose motivation. Think about adding more Right Brain Core Drives and making the activity itself fun!`,
  rightBrain = `Also, your Right Brain Core Drives are much stronger than Left Brain Ones, which means your experience is much more intrinsic in nature. This is great because users genuinely enjoy your experience. You can also consider adding in more Left Brain Game Techniques to add more feeling of accomplishment, more ingrained ownership, and more controlled limitations to spice up the experience.`,
  goodMotivation = `Also, you seem to have a great balance between Left Brain and Right Brain Core Drives, which means you likely have a good balance between Intrinsic and Extrinsic Motivation. Just be very careful because Extrinsic Motivation designed badly may kill Intrinsic Motivation.`,
  fallingAsleep = `Hmm, it also looks like your experience is neither strong on Right Brain nor Left Brain Core Drives, which means that you are weak on both Intrinsic and Extrinsic Motivations. I'm already falling asleep.`,
  anotherDay = `I just had a brilliant insight on your experience that will change your life. But I think I will tell you another day.`,
}

export default class OctalysisScoreHelper {
  private summary: string = '';
  private feedback: string = '';

  private WhiteHatScore(scoreArray: Array<number>): number {
    let s = 0;
    s += scoreArray[0] * 5;
    s += scoreArray[7] * 3;
    s += scoreArray[1] * 3;
    s += scoreArray[6] * 1;
    s += scoreArray[2] * 1;
    return s;
  }
  private BlackHatScore(scoreArray: Array<number>): number {
    let s = 0;
    s += scoreArray[4] * 5;
    s += scoreArray[3] * 3;
    s += scoreArray[5] * 3;
    s += scoreArray[2] * 1;
    s += scoreArray[6] * 1;
    return s;
  }

  private RightBrainScore(scoreArray: Array<number>): number {
    let s = 0;
    s += scoreArray[2] * 5;
    s += scoreArray[1] * 3;
    s += scoreArray[3] * 3;
    s += scoreArray[0] * 1;
    s += scoreArray[4] * 1;
    return s;
  }

  private LeftBrainScore(scoreArray: Array<number>): number {
    let s = 0;
    s += scoreArray[6] * 5;
    s += scoreArray[5] * 3;
    s += scoreArray[7] * 3;
    s += scoreArray[0] * 1;
    s += scoreArray[4] * 1;
    return s;
  }

  GetSummary2(data: any): string {
    const whiteHatScore = this.WhiteHatScore(this.objectToScoreArray(data));
    const blackHatScore = this.BlackHatScore(this.objectToScoreArray(data));
    const leftBrainScore = this.LeftBrainScore(this.objectToScoreArray(data));
    const rightBrainScore = this.RightBrainScore(this.objectToScoreArray(data));

    if (whiteHatScore === 0 && blackHatScore === 0 && leftBrainScore === 0 && rightBrainScore === 0) {
      return summary.initial;
    }

    if (whiteHatScore > 40 && blackHatScore * 2 < whiteHatScore) {
      this.summary = summary.whiteHat;
      // If Black Hat Score is more than 50 AND double White Hat Score:
    } else if (blackHatScore > 40 && whiteHatScore * 2 < blackHatScore) {
      this.summary = summary.blackHat;
      // If both above 50
    } else if (whiteHatScore > 40 && blackHatScore > 40) {
      this.summary = summary.proudOfYou;
      // if both below 50
    } else if (whiteHatScore < 40 && blackHatScore < 40) {
      this.summary = summary.weakExperience;
    }

    // If Left Brain Score is more than 50 AND double Right Brain Score:
    if (leftBrainScore > 40 && rightBrainScore * 2 < leftBrainScore) {
      return `${this.summary} and ${summary.leftBrain}`;
      // If Right Brain Score is more than 50 AND double Left Brain Score:
    } else if (rightBrainScore > 40 && leftBrainScore * 2 < rightBrainScore) {
      return `${this.summary} and ${summary.rightBrain}`;
      // If both sides above 50:
    } else if (rightBrainScore > 40 && leftBrainScore > 40) {
      return `${this.summary} and ${summary.goodMotivation}`;
      // If both sides below 50:
    } else if (rightBrainScore < 40 && leftBrainScore < 40) {
      return `${this.summary} and ${summary.fallingAsleep}`;
    }

    // if nothing is loaded
    if (this.summary == '') {
      this.summary = summary.anotherDay;
    }

    return this.summary;
  }

  GetFeedback2(data: any): string {
    const whiteHatScore = this.WhiteHatScore(this.objectToScoreArray(data));
    const blackHatScore = this.BlackHatScore(this.objectToScoreArray(data));
    const leftBrainScore = this.LeftBrainScore(this.objectToScoreArray(data));
    const rightBrainScore = this.RightBrainScore(this.objectToScoreArray(data));

    if (whiteHatScore === 0 && blackHatScore === 0 && leftBrainScore === 0 && rightBrainScore === 0) {
      return feedback.initial;
    }

    // If White Hat Score is more than 50 AND double Black Hat Score:
    if (whiteHatScore > 40 && blackHatScore * 2 < whiteHatScore) {
      this.feedback = feedback.whiteHat;

      // If Black Hat Score is more than 50 AND double White Hat Score:
    } else if (blackHatScore > 40 && whiteHatScore * 2 < blackHatScore) {
      this.feedback = feedback.blackHat;

      // If both above 50
    } else if (whiteHatScore > 40 && blackHatScore > 40) {
      this.feedback = feedback.proudOfYou;

      // if both below 50
    } else if (whiteHatScore < 40 && blackHatScore < 40) {
      this.feedback = feedback.weakExperience;
    }

    // If Left Brain Score is more than 50 AND double Right Brain Score:
    if (leftBrainScore > 40 && rightBrainScore * 2 < leftBrainScore) {
      if (this.feedback !== '') this.feedback = `${this.feedback} / `;
      return `${this.feedback}${feedback.leftBrain}`;

      // If Right Brain Score is more than 50 AND double Left Brain Score:
    } else if (rightBrainScore > 40 && leftBrainScore * 2 < rightBrainScore) {
      if (this.feedback !== '') this.feedback = `${this.feedback} / `;
      return `${this.feedback}${feedback.rightBrain}`;

      // If both sides above 50:
    } else if (rightBrainScore > 40 && leftBrainScore > 40) {
      if (this.feedback !== '') this.feedback = `${this.feedback} / `;
      return `${this.feedback}${feedback.goodMotivation}`;

      // If both sides below 50:
    } else if (rightBrainScore < 40 && leftBrainScore < 40) {
      if (this.feedback !== '') this.feedback = `${this.feedback} / `;
      return `${this.feedback}${feedback.fallingAsleep}`;
    }

    // if nothing is loaded
    if (this.summary == '') {
      this.feedback = feedback.anotherDay;
    }

    return this.feedback;
  }

  GetTotalScore(data: any): number {
    return this.powScore(this.objectToScoreArray(data));
  }

  powScore(scoreArray: Array<number>): number {
    return scoreArray.map((s) => Math.pow(s, 2)).reduce((a, b) => a + b);
  }

  objectToScoreArray(data: any) {
    return [
      data['CD1'].score,
      data['CD3'].score,
      data['CD5'].score,
      data['CD7'].score,
      data['CD8'].score,
      data['CD6'].score,
      data['CD4'].score,
      data['CD2'].score,
    ];
  }
}
