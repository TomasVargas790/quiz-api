import { Theme, ThemeSchema } from './themes.model.cjs';
import { Description, DescriptionSchema } from './descriptions.model.cjs';
import { Question, QuestionSchema } from './questions.model.cjs';
import { Answer, AnswerSchema } from './answers.model.cjs';
import { User, UserSchema } from './users.model.cjs';

function setupModels (sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Theme.init(ThemeSchema, Theme.config(sequelize));
  Description.init(DescriptionSchema, Description.config(sequelize));
  Question.init(QuestionSchema, Question.config(sequelize));
  Answer.init(AnswerSchema, Answer.config(sequelize));

  User.associate(sequelize.models);
  Theme.associate(sequelize.models);
  Description.associate(sequelize.models);
  Question.associate(sequelize.models);
  Answer.associate(sequelize.models);
}

export default setupModels;
