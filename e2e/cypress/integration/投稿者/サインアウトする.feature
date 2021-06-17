Feature: サインアウトする

  @focus
  Scenario: 基本コース
    Given 認証済
    Then I see "Google" in the title

  @focus
  Scenario: 代替コース
    Given ユーザーが存在しない
    Then I see "Google" in the title