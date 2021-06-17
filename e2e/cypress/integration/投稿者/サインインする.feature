Feature: サインインする

  @focus
  Scenario: 基本コース
    Given ユーザーが存在する
    Then I see "Google" in the title

  @focus
  Scenario: 代替コース
    Given ユーザーが存在しない
    Then I see "Google" in the title